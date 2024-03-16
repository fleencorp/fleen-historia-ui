import {MonoTypeOperatorFunction, Observable, Subscriber} from 'rxjs';
import {Constructor} from "@app/model/interface";
import {SearchResultView} from "@app/model/view";
import {mapToSearchResult} from "@app/shared/helper";

/**
 * Transforms an observable stream of objects into an observable stream of model instances.
 *
 * This custom RxJS operator, `toModel`, simplifies the process of mapping objects emitted by an observable
 * to instances of your custom model classes. It achieves this by taking a constructor function as input
 * and using it to create new model instances for each object in the stream.
 *
 * @typeparam T The type of data emitted by the source observable. It must extend `Object`.
 * @typeparam R The type of the model instances created by the operator. This is inferred based on the constructor type.
 *
 * @param Constructor A type representing the constructor function for your model class. This constructor
 *                   must accept a single argument of type `T` (the same type as the source observable's data).
 *
 * @returns A `MonoTypeOperatorFunction<T>` that can be used within the `pipe` method of an observable stream.
 *          This operator function transforms the stream by creating model instances for each emitted object.
 */
export function toModel<T extends Object, R>(Constructor: Constructor<T>): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => new Observable((subscriber: Subscriber<T>): void => {
    source.subscribe({
      next(data: T): void { subscriber.next(Constructor ? new Constructor(data) : data); },
      error(err): void { subscriber.error(err); },
      complete(): void { subscriber.complete(); },
    });
  });
}

/**
 * Transforms an Observable stream of type `T` into an Observable stream of type `SearchResultView<T>`.
 * This operator is particularly useful for transforming raw search results (`T`) into a more enriched format (`SearchResultView<T>`)
 * suitable for display or further processing.
 *
 * The `SearchResultView` class is assumed to be a custom class that likely takes a generic type parameter.
 * It's designed to encapsulate the original data (`T`) along with potentially additional information relevant to search results,
 * such as formatting, highlighting, or metadata.
 *
 * @param Constructor - The constructor function of the `SearchResultView` class. This function is used to create new instances
 *                       of `SearchResultView` with the incoming data (`T`). It's crucial to ensure the `Constructor` is compatible
 *                       with the type of `T` in the Observable stream.
 * @returns A MonoTypeOperatorFunction that can be applied to an Observable stream of type `T`. This operator function performs
 *          the transformation by creating `SearchResultView` instances for each element in the source stream.
 */
export function toSearchResult<T extends Object, R>(Constructor: Constructor<T>): MonoTypeOperatorFunction<SearchResultView<T>> {
  return (source: Observable<SearchResultView<T>>) => new Observable((subscriber: Subscriber<SearchResultView<T>>): void => {
    source.subscribe({
      next(data: SearchResultView<T>): void {
        const searchResult: SearchResultView<T> = mapToSearchResult(Constructor, data);
        subscriber.next(searchResult); },
      error(err): void { subscriber.error(err); },
      complete(): void { subscriber.complete(); },
    });
  });
}
