import styled from "styled-components";
import { useRouter } from "next/router";
import { FormContainer, Input, Label, Textarea } from "./Form";
import { StyledButton } from "./StyledButton.js";

export default function Comments({ locationName, comments }) {
  const Article = styled.article`
    display: grid;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 5px solid black;
    border-radius: 0.8rem;
    padding: 2rem;
    text-align: center;
    width: 50%;
    margin-left: 25%;
    p {
      border-bottom: solid 1px black;
      padding: 20px;
    }
  `;

  const router = useRouter();

  async function handleSubmitComment(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const commentData = Object.fromEntries(formData);

    const { id } = router.query;

    const response = await fetch(`/api/places/${id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    });

    if (response.ok) {
      await response.json();
      router.push(`/places/${id}`);
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  return (
    <Article>
      <FormContainer onSubmit={handleSubmitComment}>
        <Label htmlFor="name">Your Name</Label>
        <Input type="text" name="name" placeholder="name" required />
        <Label htmlFor="comment">Your Comment</Label>
        <Textarea name="comment" placeholder="comment here..." required />
        <StyledButton type="submit">Send</StyledButton>
      </FormContainer>
      {comments && (
        <>
          <h1> {comments.length} fans commented on this place:</h1>
          {comments.map(({ name, comment }, idx) => {
            return (
              <>
                <p key={idx}>
                  <small>
                    <strong>{name}</strong> commented on {locationName}
                  </small>
                </p>
                <span>{comment}</span>
              </>
            );
          })}
        </>
      )}
    </Article>
  );
}
