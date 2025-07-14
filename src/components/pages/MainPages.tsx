import { Flex, Layout } from "antd";
import MainContent from '../MainContent';

export default function MainPages() {
  const layoutStyle = {
    borderRadius: 8,
    overflow: "hidden",
    minHeight: "100vh",
    width: "calc(50% - 8px)",
    maxWidth: "calc(100% - 8px)",
  };

  return (
    <Flex gap="middle" wrap>
      <Layout style={layoutStyle}>
        <MainContent />
      </Layout>
    </Flex>
  );
}
