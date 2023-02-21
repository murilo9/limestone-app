import { MoreVertRounded } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../store";
import { UserEntity } from "../../users/types/User";
import { CardCommentEntity } from "../types/CardComment";

type CardCommentProps = {
  cardCommentId: string;
};

export default function CardComment({ cardCommentId }: CardCommentProps) {
  const comment: CardCommentEntity | undefined = useAppSelector(
    (state) => state.cardComments.entities[cardCommentId]
  );
  const commentAuthor: UserEntity | undefined = useAppSelector(
    (state) => state.users.entities[comment?.author]
  );

  return (
    <>
      <Card
        elevation={0}
        sx={{
          bgcolor: "rgba(0,0,0, 0.01)",
          border: `1px solid rgba(90, 126, 144, 0.2)`,
          "&:not(:last-child)": {
            mb: 1,
          },
        }}
      >
        {comment && commentAuthor ? (
          <>
            <CardHeader
              avatar={<Avatar>JD</Avatar>}
              action={
                <IconButton>
                  <MoreVertRounded />
                </IconButton>
              }
              title={`${commentAuthor.firstName} ${commentAuthor.lastName}`}
              subheader={new Date(comment.updated).toLocaleString()}
            />
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                pt: 0,
                pr: { xs: 2, sm: 3 },
              }}
            >
              <Typography
                variant="body2"
                sx={{ width: { xs: "100%", sm: "calc(100% - 56px)" } }}
              >
                {comment.body}
              </Typography>
            </CardContent>
          </>
        ) : (
          "error-comment-not-found " + commentAuthor
        )}
      </Card>
    </>
  );
}
