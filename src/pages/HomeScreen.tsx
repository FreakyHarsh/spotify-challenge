import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../index";

export const HomeScreen = () => {
  const { user } = useSelector((state: RootState) => state.user);
  console.log(user);
  return <div>df</div>;
};
