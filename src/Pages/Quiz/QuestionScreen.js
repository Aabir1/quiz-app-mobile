import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import colors from "../../Constants/color";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import URL from "../../Config/Url";
import { Ionicons } from "@expo/vector-icons";
import ApiHeaders from "../../Config/ApiHeaders";

/**
 * display question one by one and save answers
 *
 * @param {Navigator} navigation
 * @param {Route} route
 *
 * @returns {mix} view
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
export default function QuestionScreen({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [counter, setCounter] = useState(0);
  const [total, setTotal] = useState("");
  const [selectItem, setSelectItem] = useState("");
  const [selOption, setSelOption] = useState("");
  const [rightOption, setRightOption] = useState("");
  const [lockSelection, setLoackSelection] = useState(false);
  const [textAnswer, setTextAnswer] = useState("");
  const answerCount = useRef(0);

  useEffect(() => {
    setLoading(true);
    callInit();
  }, []);

  /**
   * Initialize data
   *
   * @author Aabir Hussain <aabir.hussain1@gmail.com>
   */
  const callInit = () => {
    //setIsLoading(true);
    loadQuestion(0, 1);
    setData("");
    setCounter(0);
  };

  /**
   * when user select option save required data.
   *
   * @param {Object} item 
   * @param {String} sNo 
   * @param {String} rightOption
   *
   * @author Aabir Hussain <aabir.hussain1@gmail.com>
   */
  const selectOption = (item, sNo, rightOption) => {
    if (lockSelection) {
      alert(`You already selected answer you can't change the value`);
    } else {
      setSelectItem(item);
      setSelOption(sNo);
      setRightOption(rightOption);
    }
  };

  /**
   * Check if the selected answer if right/wrong
   *
   * @author Aabir Hussain <aabir.hussain1@gmail.com>
   */
  const checkAnswer = () => {
    if (rightOption === "optionOne") {
      if (selOption === 1) {
        answerCount.current = answerCount.current + 1;
      }
    } else if (rightOption === "optionTwo") {
      if (selOption === 2) {
        answerCount.current = answerCount.current + 1;
      }
    } else if (rightOption === "optionThree") {
      if (selOption === 3) {
        answerCount.current = answerCount.current + 1;
      }
    }
  };

  /**
   * Load questions from api
   *
   * @param {Integer} offset 
   * @param {Integer} limit 
   *
   * @author Aabir Hussain <aabir.hussain1@gmail.com>
   */
  const loadQuestion = (offset, limit) => {
    const params = "limit=" + limit + "&" + "offset=" + offset + "&quiz=" + route.params.id;

    axios.get(URL.BASE_URL + URL.QUESTION_GET_BY_QUIZ + "?" + params, ApiHeaders).then((response) => {
      handleQuestionResponse(response.data.data.data);
      setTotal(response.data.data.total);
    }).catch((error) => {
      console.log(error);
    });
  };

  /**
   * check if answer is already present on server
   * then display selected answer
   *
   * @param {String} id 
   *
   * @author Aabir Hussain <aabir.hussain1@gmail.com>
   */
  const loadAnswer = (id) => {
    const params = "question=" + id;
    const finalUrl = URL.BASE_URL + URL.GET_BY_QUESTIONS + "?" + params;

    axios.get(finalUrl, ApiHeaders).then((response) => {
      if (response.data.data !== null) {
        setLoackSelection(true);
        setSelOption(response.data.data.selectedOption);
        setTextAnswer(response.data.data.answer);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  /**
   * save question to state and then load answer
   *
   * @param {*} items 
   *
   * @author Aabir Hussain <aabir.hussain1@gmail.com>
   */
  const handleQuestionResponse = (items) => {
    if (items.length === 1) {
      loadAnswer(items[0].id);
    }
    setData(items);
    setLoading(false);
  };

  /**
   * Save Answer to server
   *
   * @param {*} no
   *
   * @author Aabir Hussain <aabir.hussain1@gmail.com>
   */
  const saveAnswer = (no) => {
    const params = {
      answer: textAnswer === "" ? " " : textAnswer,
      selectedOption: no,
      question: data[0].id,
    };

    axios.post(URL.BASE_URL + URL.SAVE_ANSWER, params, ApiHeaders).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
  };

  /**
   * handle next
   *
   * @author Aabir Hussain <aabir.hussain1@gmail.com>
   */
  const handleNext = () => {
    if (selOption === 1 || selOption === 2 || selOption === 3) {
      setLoackSelection(false);
      setTextAnswer("");
      saveAnswer(selOption);
      checkAnswer();
      setLoading(true);
      setCounter(counter + 1);
      loadQuestion(counter + 1, 1);
      setSelectItem("");
      setSelOption("");

      if (counter + 1 === total) {
        navigation.replace("ThanksScreen", {
          answerCounter: answerCount.current,
          total: total,
        });
      }
    } else {
      setSelectItem("");
      setSelOption("");
      alert("Please Select one option");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        // Background Linear Gradient
        colors={[colors.red4, colors.red3, colors.red2]}
        style={{ flex: 1 }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", top: 40, left: 20 }}
        >
          <Ionicons
            name="ios-close-circle-outline"
            size={45}
            color={colors.white}
          />
        </TouchableOpacity>
        <View style={styles.centerView}>
          <Image
            source={require("../../../assets/homeIcon.png")}
            style={{ width: 150, height: 150 }}
          />
          {isLoading ? (
            <ActivityIndicator size={"large"} color={colors.white} />
          ) : total === 0 ? (
            <Text style={styles.textCenter}>{"No questions found"}</Text>
          ) : (
            <>
              <Text style={styles.textTotal}>
                question {counter + 1} of {total}
              </Text>
              <Text style={styles.textCenter}>
                {data.length === 1 ? data[0].question : null}
              </Text>
            </>
          )}
        </View>
        {isLoading || total === 0 ? null : (
          <>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Free Text"
              maxLength={256}
              onChangeText={(value) => setTextAnswer(value)}
              value={textAnswer}
              editable={lockSelection ? false : true}
            />
            <TouchableOpacity
              style={{
                ...styles.options,
                backgroundColor: selOption === 1 ? colors.green2 : colors.white,
              }}
              onPress={() =>
                selectOption(data[0].optionOne, 1, data[0].rightOption)
              }
            >
              <Text
                style={{
                  ...styles.optionsText,
                  color: selOption === 1 ? colors.white : colors.red2,
                }}
              >
                {data.length === 1 ? data[0].optionOne : null}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.options,
                backgroundColor: selOption === 2 ? colors.green2 : colors.white,
              }}
              onPress={() =>
                selectOption(data[0].optionTwo, 2, data[0].rightOption)
              }
            >
              <Text
                style={{
                  ...styles.optionsText,
                  color: selOption === 2 ? colors.white : colors.red2,
                }}
              >
                {data.length === 1 ? data[0].optionTwo : null}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.options,
                backgroundColor: selOption === 3 ? colors.green2 : colors.white,
              }}
              onPress={() =>
                selectOption(data[0].optionThree, 3, data[0].rightOption)
              }
            >
              <Text
                style={{
                  ...styles.optionsText,
                  color: selOption === 3 ? colors.white : colors.red2,
                }}
              >
                {data.length === 1 ? data[0].optionThree : null}
              </Text>
            </TouchableOpacity>
          </>
        )}
        {isLoading || total === 0 ? null : (
          <>
            <View
              style={{
                height: 1,
                backgroundColor: colors.white,
                marginHorizontal: 8,
                marginTop: 15,
              }}
            />
            <TouchableOpacity
              style={styles.letStartText}
              onPress={() => handleNext()}
            >
              <Text style={styles.bottomText}>Next</Text>
            </TouchableOpacity>
          </>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomText: {
    fontSize: 20,
    fontFamily: "MontserratSemiBold",
    color: colors.red1,
  },
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textCenter: {
    textAlignVertical: "center",
    textAlign: "center",
    fontFamily: "MontserratBold",
    fontSize: 25,
    color: colors.white,
    marginHorizontal: 8,
  },
  letStartText: {
    backgroundColor: colors.white,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 10,
    width: 150,
    elevation: 10,
  },
  title: {
    color: "white",
    fontSize: 15,
    fontFamily: "MontserratSemiBold",
  },
  displayTime: {
    alignSelf: "flex-end",
    color: "white",
    fontFamily: "MontserratRegular",
    marginTop: 10,
    fontSize: 10,
  },
  options: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  optionsText: {
    fontFamily: "MontserratSemiBold",
    fontSize: 15,
  },
  textTotal: {
    textAlignVertical: "center",
    textAlign: "center",
    fontFamily: "MontserratMedium",
    fontSize: 20,
    color: colors.white,
  },
  optionsTextInput: {
    fontFamily: "MontserratSemiBold",
    fontSize: 15,
    color: colors.white,
    marginLeft: 12,
  },
  textInputStyle: {
    backgroundColor: colors.white,
    margin: 10,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 15,
    height: 40,
    fontFamily: "MontserratMedium",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.red1,
    elevation: 10,
  },
});
