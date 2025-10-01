import { useState } from "react";

/**
 * The useFilter function takes a list of data and a callback function, filters the data based on a
 * query string, and returns the filtered data along with a function to update the query string.
 * @param dataList - The `dataList` parameter is an array of data that you want to filter.
 * @param callback - The `callback` parameter is a function that is used to determine whether an item
 * in the `dataList` should be included in the filtered result. It takes each item in the `dataList` as
 * input and should return a value that will be used for filtering.
 * @returns The `useFilter` function returns an array containing two elements:
 * 1. `setQuary`: A state setter function to update the query value.
 * 2. `filteredData`: An array of data items that have been filtered based on the query and the
 * callback function provided.
 */
export function useFilter(dataList, callback) {

    const [quary, setQuary] = useState('');
    const filteredData = dataList.filter((data) => callback(data).toLowerCase().includes(quary));

    return [setQuary, filteredData]

}

