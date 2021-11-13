import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { HiChevronRight } from "react-icons/hi";
import { withRouter } from "react-router-dom";

const NavBreadcrumb = (props) => {
  const {
    location: { pathname },
  } = props;
  const pathNames = pathname.split("/").filter((x) => x);
  return (
    <Breadcrumb
      fontSize="sm"
      display={{ base: "flex", md: "none" }}
      {...props}
      separator={
        <Box
          as={HiChevronRight}
          color="gray.800"
          fontSize="md"
          top="2px"
          pos="relative"
        />
      }
    >
      {pathNames.map((name, index) => {
        const isLast = index === pathNames.length - 1;
        return (
          <BreadcrumbItem
            color={isLast ? "gray.800" : "gray.500"}
            textTransform={isLast && "capitalize"}
            isLastChild={isLast}
          >
            <BreadcrumbLink>{name}</BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};
export default withRouter(NavBreadcrumb);
