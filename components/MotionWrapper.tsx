"use client";

import { motion, MotionProps } from "framer-motion";
import React from "react";

type ExtendedMotionProps = MotionProps & React.HTMLAttributes<HTMLElement>;

export const MotionDiv = (
  props: React.PropsWithChildren<ExtendedMotionProps>
) => {
  return <motion.div {...props} />;
};

export const MotionH1 = (
  props: React.PropsWithChildren<ExtendedMotionProps>
) => {
  return <motion.h1 {...props} />;
};

export const MotionP = (
  props: React.PropsWithChildren<ExtendedMotionProps>
) => {
  return <motion.p {...props} />;
};
