import Link from "next/link";
import { useRouter } from "next/router.js";
import useSWR from "swr";
import styled from "styled-components";
import { StyledLink } from "../../../components/StyledLink.js";
import { StyledButton } from "../../../components/StyledButton.js";
import { StyledImage } from "../../../components/StyledImage.js";
import Comments from "../../../components/Comments.js";

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  height: 30rem;
  width: 50%;
  left: 25%;
`;

const ButtonContainer = styled.section`
  display: flex;
  justify-content: center;
  width: 40%;
  align-items: center;
  justify-items: center;
  margin-left: 30%;
  position: relative;
  gap: 0.5rem;

  & > * {
    flex-grow: 1;
    text-align: center;
  }
`;

const StyledLocationLink = styled.a`
  text-align: center;
  background-color: white;
  border: 3px solid lightsalmon;
  width: 40%;
  margin-left: 30%;
  padding: 0.8rem 1.5rem;
  border-radius: 0.6rem;
  color: black;
  text-decoration: none;
  font-weight: bold;
`;

const TitleContainer = styled.div`
  text-align: center;
`;

const ParContainer = styled.div`
  text-align: center;
`;

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const {
    data: { comments, ...place } = {},
    isLoading,
    error,
  } = useSWR(`/api/places/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  async function deletePlace() {
    if (confirm("Once its gone, its gone forever! Are you sure?")) {
      await fetch(`/api/places/${id}`, {
        method: "DELETE",
      });
      router.push("/");
      return;
    }
  }

  return (
    <>
      <ImageContainer>
        <StyledImage
          src={place.image}
          priority
          fill
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          alt=""
        />
      </ImageContainer>
      <TitleContainer>
        <h2>
          {place.name}, {place.location}
        </h2>
      </TitleContainer>
      <Link href={place.mapURL} passHref legacyBehavior>
        <StyledLocationLink>Location on Google Maps</StyledLocationLink>
      </Link>
      <ParContainer>
        <p>{place.description}</p>
      </ParContainer>
      <ButtonContainer>
        <Link href={`/places/${id}/edit`} passHref legacyBehavior>
          <StyledButton>Edit</StyledButton>
        </Link>
        <StyledButton onClick={deletePlace} type="button" variant="delete">
          Delete
        </StyledButton>
      </ButtonContainer>
      <Comments locationName={place.name} comments={comments} />
      <Link href={"/"} passHref legacyBehavior>
        <StyledLink justifySelf="start">back</StyledLink>
      </Link>
    </>
  );
}
