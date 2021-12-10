import { Spinner, Tag, TagLabel,Flex } from "@chakra-ui/react";

function WidgetLoading(props) {
  return (
    <Flex>
      {props.isLoading ? (
        <Tag size="xs" variant="subtle" colorScheme="purple">
          <Spinner size="xs" />
          <TagLabel>Adding...</TagLabel>
        </Tag>
      ) : null}
    </Flex>
  );
}

export default WidgetLoading;