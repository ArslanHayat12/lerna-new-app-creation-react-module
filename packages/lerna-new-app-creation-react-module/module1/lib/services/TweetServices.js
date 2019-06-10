import React, { useState, useEffect } from "react";
import { List, Spin } from "antd";
import { fetchData } from "../apis/index";
var TweetService = function () {
    var _a = useState({ hits: [], state: "simple" }), data = _a[0], setData = _a[1];
    useEffect(function () {
        fetchData()
            .then(function (result) {
            setData(result.data);
        })
            .catch(function (err) {
            console.log("Error", err);
        });
    }, []);
    return (React.createElement(List, { bordered: true, dataSource: data.hits, renderItem: function (item) { return React.createElement(List.Item, null, item.name); } }));
};
var TweetSearchService = function (_a) {
    var title = _a.title;
    var _b = useState({ hits: [], state: "loaded" }), data = _b[0], setData = _b[1];
    useEffect(function () {
        setData({ state: "loading" });
        var timer = setTimeout(function () {
            fetchData(title)
                .then(function (result) {
                setData({ hits: result.data.hits, state: "loaded" });
            })
                .catch(function (err) {
                console.log("Error", err);
            });
        }, 2000);
        return function () {
            clearTimeout(timer);
            // setData({ hits: data.hits, state: "loaded" });
        };
    }, [title]);
    return (React.createElement(React.Fragment, null, data.state === "loading" ? (React.createElement(Spin, null)) : (React.createElement(List, { bordered: true, dataSource: data.hits, renderItem: function (item) { return React.createElement(List.Item, null, item.name); } }))));
};
export { TweetService, TweetSearchService };
//# sourceMappingURL=TweetServices.js.map