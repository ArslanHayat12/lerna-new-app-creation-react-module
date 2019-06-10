import * as tslib_1 from "tslib";
import React, { useState, useEffect } from "react";
import { fetchData } from "./apis/index";
import { List, Spin, Alert, Avatar, Divider, Input } from "antd";
import { showRecords } from "./constants/";
import { spinner } from "./assets/styling";
import useDebounce from "./utils/";
var Search = Input.Search;
export var InfiniteScroll = function () {
    var _a = useState({ hits: [] }), listItems = _a[0], setListItems = _a[1];
    var _b = useState(false), isFetching = _b[0], setIsFetching = _b[1];
    var _c = useState(false), isSearch = _c[0], setIsSearch = _c[1];
    var _d = useState(""), query = _d[0], setQuery = _d[1];
    var _e = useState(20), numberOfRecords = _e[0], setLoadRecords = _e[1];
    useEffect(function () {
        if (document.documentElement.scrollTop === 0) {
            // setIsFetching(true);
        }
        window.addEventListener("scroll", handleScroll);
        return function () { return window.removeEventListener("scroll", handleScroll); };
    }, []);
    var debouncedSearchTerm = useDebounce(query, 2000);
    useEffect(function () {
        setIsSearch(true);
        if (debouncedSearchTerm) {
            fetchSearchedListItems();
        }
        else {
            setIsFetching(true);
            setLoadRecords(20);
        }
        function fetchSearchedListItems(p) {
            setListItems({ hits: [] });
            fetchData(debouncedSearchTerm)
                .then(function (result) {
                setListItems({ hits: result.data });
            })
                .catch(function (err) {
                console.log("Error", err);
            });
            setIsFetching(false);
            setIsSearch(false);
        }
    }, [debouncedSearchTerm]);
    var loadRecords = numberOfRecords;
    useEffect(function () {
        if (!isFetching)
            return;
        fetchMoreListItems();
        function fetchMoreListItems() {
            setTimeout(function () {
                fetchData(null, loadRecords)
                    .then(function (result) {
                    setListItems({ hits: result.data });
                })
                    .catch(function (err) {
                    console.log("Error", err);
                });
                setIsSearch(false);
                setIsFetching(false);
            }, 3000);
        }
    }, [isFetching, listItems, loadRecords]);
    function handleScroll() {
        if (document.documentElement.scrollHeight ===
            document.documentElement.clientHeight +
                Math.floor(document.documentElement.scrollTop)) {
            setLoadRecords(function (p) { return p + showRecords; });
            setIsFetching(true);
        }
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { textAlign: "right" } },
            React.createElement(Search, { placeholder: "search keyword", name: "title", value: query, onSearch: function (value) { return setQuery(value); }, onChange: function (e) { return setQuery(e.target.value); }, enterButton: true, style: { width: 500 } })),
        React.createElement(Divider, null),
        React.createElement(List, { bordered: true, dataSource: listItems.hits, renderItem: function (item, i) { return (React.createElement(List.Item, { key: i, extra: React.createElement("img", { width: 27, alt: "logo", src: item.image_url }) },
                React.createElement(List.Item.Meta, { avatar: React.createElement(Avatar, { src: item.image_url }), title: item.name, description: item.brewers_tips }))); } }),
        (isFetching || isSearch) && (React.createElement("div", tslib_1.__assign({}, spinner),
            React.createElement(Spin, null),
            React.createElement(Alert, { message: "Fetching Records ...", type: "info" })))));
};
//# sourceMappingURL=InfiniteScroll.js.map