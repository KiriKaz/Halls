import { Container } from "@mui/material";
import router from "next/router";
import { useEffect, useState } from "react";
import { PostEditor } from "../../components/editor";

const CreatePost = () => {
  const [slug, setSlug] = useState<string>((Math.random() * 10000).toString());

  useEffect(() => {
    if (!localStorage.getItem('sessionToken')) {
      router.push('/login');
    }
  }, []);

  return (
    <Container maxWidth='md'>
      <PostEditor slug={slug} />
    </Container>
  );
};

export default CreatePost;