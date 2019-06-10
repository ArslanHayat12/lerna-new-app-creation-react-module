import React, { useState, useEffect } from "react";
import { fetchData } from "./apis/index";
import { Tweets } from "./interfaces/interface";
import { List, Spin, Alert, Avatar, Divider, Input } from "antd";
import { showRecords } from "./constants/";
import { spinner } from "./assets/styling";
import useDebounce from "./utils/";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
const { Header, Footer, Content } = Layout;
const Search = Input.Search;
export const InfiniteScroll = () => {
  const [listItems, setListItems] = useState<Tweets>({ hits: [] });
  const [isFetching, setIsFetching] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [numberOfRecords, setLoadRecords] = useState(20);

  useEffect(() => {
    if (document.documentElement.scrollTop === 0) {
      // setIsFetching(true);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const debouncedSearchTerm = useDebounce(query, 2000);

  useEffect(() => {
    setIsSearch(true);
    if (debouncedSearchTerm) {
      fetchSearchedListItems();
    } else {
      setIsFetching(true);
      setLoadRecords(20);
    }
    function fetchSearchedListItems(p?: any) {
      setListItems({ hits: [] });
      fetchData(debouncedSearchTerm)
        .then((result: any) => {
          setListItems({ hits: result.data });
        })
        .catch((err: any) => {
          console.log("Error", err);
        });
      setIsFetching(false);
      setIsSearch(false);
    }
  }, [debouncedSearchTerm]);

  const loadRecords = numberOfRecords;
  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
    function fetchMoreListItems() {
      setTimeout(() => {
        fetchData(null, loadRecords)
          .then((result: any) => {
            setListItems({ hits: result.data });
          })
          .catch((err: any) => {
            console.log("Error", err);
          });
        setIsSearch(false);
        setIsFetching(false);
      }, 3000);
    }
  }, [isFetching, listItems, loadRecords]);

  function handleScroll() {
    if (
      document.documentElement.scrollHeight ===
      document.documentElement.clientHeight +
        Math.floor(document.documentElement.scrollTop)
    ) {
      setLoadRecords(p => p + showRecords);
      setIsFetching(true);
    }
  }

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["useState"]}
          style={{ lineHeight: "64px" }}
        />
      </Header>
      <Content style={{ padding: "0 250px" }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
          <div style={{ textAlign: "right" }}>
            <Search
              placeholder="search keyword"
              name="title"
              value={query}
              onSearch={value => setQuery(value)}
              onChange={e => setQuery(e.target.value)}
              enterButton
              style={{ width: 500 }}
            />
          </div>
          <Divider />

          <List
            bordered
            dataSource={listItems.hits}
            renderItem={(item, i) => (
              <List.Item
                key={i}
                extra={<img width={27} alt="logo" src={item.image_url} />}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.image_url} />}
                  title={item.name}
                  description={item.brewers_tips}
                />
              </List.Item>
            )}
          />
          {(isFetching || isSearch) && (
            <div {...spinner}>
              <Spin />
              <Alert message="Fetching Records ..." type="info" />
            </div>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Searching of Content</Footer>
    </Layout>
  );
};
