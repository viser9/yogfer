import React, { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { useRouter } from "next/navigation";

export const TextParallaxContentExample = (rout: any) => {
  const router = useRouter();
  return (
    <div>
      <div id="about">
        <TextParallaxContent
          imgUrl="https://firebasestorage.googleapis.com/v0/b/fr-ferreira-institute.appspot.com/o/HomePage%2F4723944388.png?alt=media&token=5f3deaf4-e019-405b-b27a-8c535f046bae"
          subheading="Yoga"
          heading="Built for all of us."
        >
          <ExampleContent1 nav={router} />
        </TextParallaxContent>
      </div>
      <div id="join">
        <TextParallaxContent
          imgUrl="https://firebasestorage.googleapis.com/v0/b/fr-ferreira-institute.appspot.com/o/HomePage%2Fdownload.png?alt=media&token=f3091bfe-dcb5-4f9c-bd90-edca98ff9d48"
          subheading="Meditation"
          heading="Is a way for nourishing and blossoming the divinity within you."
        >
          <ExampleContent2 nav={router} />
        </TextParallaxContent>
      </div>
      <div id="contact">
        <TextParallaxContent
          imgUrl="https://firebasestorage.googleapis.com/v0/b/fr-ferreira-institute.appspot.com/o/HomePage%2FSCR-20240608-lxtp.jpeg?alt=media&token=56e3bd9d-f370-41d6-b0fe-83579015f24e"
          subheading="Let's"
          heading="Inhale the future. Exhale the past.."
        >
          <ExampleContent3 nav={router} />
        </TextParallaxContent>
      </div>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  children,
}: {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: ReactNode;
}) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }: { imgUrl: string }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({
  subheading,
  heading,
}: {
  subheading: string;
  heading: string;
}) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const ExampleContent1 = ({ nav }: { nav: any }) => (
  <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Fr. Ferreira Yoga and Nature Cure Institute
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        Yoga is a set of physical, mental, and spiritual exercises. Yoga is said
        to have originated in ancient India. It seeks to calm and discipline the
        mind. These days, a lot of people are becoming more and more conscious
        of their lifestyle and food habits. Yoga Classes in Agra help people to
        learn yoga and slowly introduce it as a daily habit in their lives. Yoga
        is beneficial for achieving a healthy mind and body.
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        We are dedicated to improve people`&apos`s lifestyle and make their life
        energetic and illness free with the help of yoga and nature cure.
      </p>
      <a href="#join">
        <button className="relative px-9 py-4 font-medium rounded-lg text-xl bg-indigo-500 text-white w-fit transition shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
          Join Now <FiArrowUpRight className="inline" />
        </button>
      </a>
    </div>
  </div>
);

const ExampleContent2 = ({ nav }: { nav: any }) => (
  <div className="items-center flex-col flex  md:flex-none  mx-auto  max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Join us today
    </h2>
    <div>
      <p className="mb-2 text-xl text-neutral-600 md:text-2xl flex justify-center">
        Join as a student
      </p>
      <button
        onClick={() => {
          nav.push("/student-login");
        }}
        className="relative px-9 py-4 font-medium rounded-lg text-xl bg-indigo-500 text-white w-fit transition shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
      >
        Admission Form <FiArrowUpRight className="inline" />
      </button>
    </div>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl flex justify-center md:flex-none md:justify-start">
        Join as an instructor
      </p>
      <button
        onClick={() => {
          nav.push("/trainer-login");
        }}
        className="relative px-9 py-4 font-medium rounded-lg text-xl bg-indigo-500 text-white w-fit transition shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
      >
        Yoga Teacher Form
        <FiArrowUpRight className="inline" />
      </button>
    </div>
  </div>
);

const ExampleContent3 = ({ nav }: { nav: any }) => (
  <div className="flex sm:flex-row mx-auto  max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Frequenctly asked questions (FAQs)
      <button
        onClick={() => {
          window.open("https://www.google.com/maps/place/Fr.+Ferreira+Yoga+and+Nature+Cure+Institute+https:%2F%2Fyoutube.com%2F@naturecureyoga%3Fsi%3DytOeoHMl1iBhJslK/@27.2226923,77.999641,16.96z/data=!4m6!3m5!1s0x3974774c9c994907:0x82da818cab4d2a86!8m2!3d27.2227031!4d78.0022896!16s%2Fg%2F11f2wpmpld?entry=ttu");
        }}
        className="relative px-6 py-2 mt-4 font-medium rounded-lg text-sm bg-indigo-500 text-white w-fit transition shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
      >
        Locate Us <FiArrowUpRight className="inline" />
      </button>
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-900 md:text-md">
        1. How is yoga beneficial to my health?
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-lg">
        Yoga is said to have many health benefits out of which these three stand
        out the most: strength, balance and flexibility.
      </p>
      <p className="mb-4 text-xl text-neutral-900 md:text-md">
        2. Does Fr Ferreira Yoga and Naturopathy Institute in Dayal Bagh provide
        private yoga classes?
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-lg">
        Private yoga classes refer to exercise sessions where you get to have a
        one-on-one training session with a qualified trainer. It is recommended
        that you call Fr Ferreira Yoga and Naturopathy Institute and check for
        the availability of this service.
      </p>
      <p className="mb-4 text-xl text-neutral-900 md:text-md">
        3. Do I need to book a time slot at Fr Ferreira Yoga and Naturopathy
        Institute in Dayal Bagh for my yoga session?
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-lg">
        Usually, based on the class you are a part of, your time slots get
        booked. Just to be sure, we advise you to call or visit Fr Ferreira Yoga
        and Naturopathy Institute in Dayal Bagh and discuss the same.
      </p>
      <p className="mb-4 text-xl text-neutral-900 md:text-md">
        4. Does Fr Ferreira Yoga and Naturopathy Institute in Agra provide group
        sessions?
      </p>
      <p className="mb-8 text-xl text-neutral-600 md:text-lg">
        Most yoga classes provide group classes for beginners, intermediates and
        advanced learners. They also provide private classes. We strongly
        recommend that you call Fr Ferreira Yoga and Naturopathy Institute in
        Agra and discuss the same to clear your doubts.
      </p>
    </div>
  </div>
);
