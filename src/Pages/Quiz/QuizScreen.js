import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import axios from "axios";
import { SingleQuiz } from "./Partials/SingleQuiz";
import { PageLoader } from "../../Components/Loader/PageLoader";
import FooterLoader from "../../Components/Loader/FooterLoader";
import idx from "idx";
import URL from "../../Config/Url";
import ApiHeaders from "../../Config/ApiHeaders";

//default limit to load quiz
const DEFAULT_LIMIT = 8;

/**
 * Display all quiz which user can attempt
 *
 * @param {Navigator} navigation
 *
 * @returns {mix} view
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
export default function QuizScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [max, setMax] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    callInit();
  }, []);

  /**
   * initialize all required data.
   *
   * @author Aabir Hussain <aabir.hussain1@gmail.com>
   */
  const callInit = () => {
    loadQuiz(0, DEFAULT_LIMIT);
    setData([]);
    setCounter(0);
  };

  /**
   * Load quiz from server
   *
   * @param {Integer} offset 
   * @param {Integer} limit 
   *
   * @author Aabir Hussain <aabir.hussain1@gmail.com>
   */
  const loadQuiz = (offset, limit) => {
    let params = "limit=" + limit + "&" + "offset=" + offset;
    if (offset <= max) {
      const finalUrl = URL.BASE_URL + URL.QUIZ_GET_ALL + "?" + params;
      axios.get(finalUrl, ApiHeaders).then((response) => {
        handleResponse(response);
      }).catch((error) => {
        console.log(JSON.stringify(error));
      });

      setPageLoading(false);
    }
  };

  /**
   * save response into state once got from api
   *
   * @param {Object} items 
   *
   * @author Aabir Hussain <aabir.hussain1@gmail.com>
   */
  const handleResponse = (items) => {
    if (items && items.data.data.data !== false) {
      let list = idx(items, (_) => _.data.data.data);
      let offset = idx(items, (_) => _.data.data.offset);
      let maxinum = idx(items, (_) => _.data.data.total);
      setMax(maxinum);
      if (list && list.length > 0 && counter === offset) {
        setData([...data, ...list]);
        setCounter(counter + DEFAULT_LIMIT);
      }
      setLoading(false);
    }
  };

  /**
   * Load more data
   *
   * @author Aabir Hussain <aabir.hussain1@gmail.com>
   */
  const LoadMore = () => {
    if (counter < max && !isLoading) {
      setLoading(true);
      loadQuiz(counter, DEFAULT_LIMIT);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {pageLoading ? (
        <PageLoader />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <SingleQuiz data={item} navigation={navigation} />
          )}
          initialNumToRender={20}
          maxToRenderPerBatch={1}
          onEndReachedThreshold={0.5}
          removeClippedSubviews={true}
          onEndReached={() => LoadMore()}
          ListFooterComponent={() => <FooterLoader loading={isLoading} />}
        />
      )}
    </View>
  );
}