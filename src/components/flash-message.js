import React from "react";
import { Message } from "semantic-ui-react";

export default function FlashMessage({message}) {
  return (
    <Message
      positive={message.type === "success"}
      negative={message.type === "fail"}
      header={message.title}
      content={message.content}
    />
  );
}
