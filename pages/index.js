import styled from "styled-components";
import Card from "../components/Card.js";
import useSWR from "swr";
import Link from "next/link.js";
import { StyledLink } from "../components/StyledLink.js";

const List = styled.ul`
  list-style: none;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2vw;
  width: 70%;
  left: 13%;
`;

const ListItem = styled.li`
  width: 100%;
  height: 100%;
  text-align: center;
`;
const FixedLink = styled(StyledLink)`
  position: fixed;
  bottom: 30px;
  right: 70px;
`;
export default function Home() {
  const { data } = useSWR("/api/places", { fallbackData: [] });

  return (
    <>
      <List role="list">
        {data.map((place) => {
          console.log(place._id);
          return (
            <ListItem key={place._id}>
              <Card
                name={place.name}
                image={place.image}
                location={place.location}
                id={`${place._id.$oid ?? place._id}`}
              />
            </ListItem>
          );
        })}
      </List>
      <Link href="/create" passHref legacyBehavior>
        <FixedLink>+ place</FixedLink>
      </Link>
    </>
  );
}
