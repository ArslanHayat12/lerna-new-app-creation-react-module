import React, { useState, useEffect } from "react";
import { List, Spin } from "antd";
import { Tweets } from "../interfaces/interface";
import { fetchData } from "../apis/index";

const TweetService = () => {
  const [data, setData] = useState<Tweets>({ hits: [], state: "simple" });
  useEffect(() => {
    fetchData()
      .then((result:any) => {
        setData(result.data);
      })
      .catch((err: any) => {
        console.log("Error", err);
      });
  }, []);
  return (
    <List
      bordered
      dataSource={data.hits}
      renderItem={item => <List.Item>{item.name}</List.Item>}
    />
  );
};

const TweetSearchService = ({ title }: any) => {
  const [data, setData] = useState<Tweets>({ hits: [], state: "loaded" });
  useEffect(() => {
    setData({ state: "loading" });
    const timer = setTimeout(() => {
      fetchData(title)
        .then((result: { data: { hits: import("../../../../../../../../../Users/Emumba/Desktop/Lerna React hooks/packages/lerna-new-app-creation-react-module/module1/src/interfaces/interface").TweetsType[] | undefined; }; }) => {
          setData({ hits: result.data.hits, state: "loaded" });
        })
        .catch((err: any) => {
          console.log("Error", err);
        });
    }, 2000);
    return () => {
      clearTimeout(timer);
      // setData({ hits: data.hits, state: "loaded" });
    };
  }, [title]);
  return (
    
    <>
      {data.state === "loading" ? (
        <Spin />
      ) : (
        <List
          bordered
          dataSource={data.hits}
          renderItem={item => <List.Item>{item.name}</List.Item>}
        />
      )}
    </>
  );
};

export { TweetService, TweetSearchService };
