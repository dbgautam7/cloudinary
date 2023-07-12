import { List } from "antd";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import mojs from "@mojs/core";

const data = [
  { label: "UseRef Hook", link: "/useRefHook" },
  { label: "UseMemo Hook", link: "/useMemoHook" },
  { label: "Upload Image From React Only", link: "/uploadImageFromReactOnly" },
  { label: "Upload Image From React Node", link: "/uploadImageFromReactNode" },
  { label: "Props Handling", link: "/propsHandling" },
  { label: "Dynamic Routing", link: "/dynamicRouting/:category/:id" },
  { label: "Infinite Scrolling", link: "/infiniteScrolling" },
  { label: "Custom Infinite Scroll", link: "/customInfiniteScroll" },
  { label: "Motion", link: "/motion" },
  { label: "Clock", link: "/clock" },
  { label: "React Quill", link: "/reactQuill" },
  { label: "React EmailJS", link: "/reactEmailJS" },
  { label: "Galli Map", link: "/galliMap" },
  { label: "Dark Mode", link: "/darkMode" },
  { label: "React Hook Form", link: "/reactHookForm" },
  { label: "Multi Stepper", link: "/stepper" },
];

const FeaturesList = () => {
  const handleItemClick = (link) => {
    console.log("Item clicked:", link);
  };

  const textRef = useRef(null);

  useEffect(() => {
    const timeline = new mojs.Timeline();

    // Move text up and down
    const move = new mojs.Html({
      el: textRef.current,
      x: { 0: 100, isYoyo: true },
      duration: 5000,
      repeat: 99,
      easing: "elastic.out",
    });

    // Change text color
    const color = new mojs.Html({
      el: textRef.current,
      color: { blue: "yellow" },
      duration: 4000,
      repeat: 99,
      yoyo: true,
      easing: "cubic.out",
    });

    timeline.add(move, color);
    timeline.play();
  }, []);

  return (
    <>
      <h1 ref={textRef} style={{ textAlign: "center" }}>
        Multi-Features App
      </h1>
      <List
        size="large"
        style={{
          display: "flex",
          width: "40%",
          justifyContent: "center",
          alignItems: "center",
          margin: "100px auto",
        }}
        bordered
        dataSource={data}
        renderItem={({ label, link }) => (
          <List.Item onClick={() => handleItemClick(link)}>
            <Link to={link}>{label}</Link>
          </List.Item>
        )}
      />
    </>
  );
};

export default FeaturesList;
