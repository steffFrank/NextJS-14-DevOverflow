"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { answerSchema } from "@/lib/validation";
import { useRef, useState } from "react";
import { useTheme } from "@/context/ThemeProvider";
import { Button } from "../ui/button";
import Image from "next/image";

const Answer = () => {
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mode } = useTheme();
  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const handleCreateAnswer = (data) => {};

  return (
    <div>
      <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>
        <Button
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          onClick={() => {}}
        >
          <Image
            src="/assets/icons/stars.svg"
            alt="star"
            width={12}
            height={12}
            className="object-contain"
          />
          Generate an AI Answer
        </Button>
      </div>

      <Form {...form}>
        <form
          className="mt-3 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <>
                    <Editor
                      apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                      onInit={(evt, editor) =>
                        // @ts-ignore
                        (editorRef.current = editor)
                      }
                      onBlur={field.onBlur}
                      onEditorChange={(content) => field.onChange(content)}
                      init={{
                        height: 350,
                        menubar: false,
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "image",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "codesample",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "wordcount",
                        ],
                        toolbar:
                          "undo redo | blocks | " +
                          "codesample bold italic forecolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help | wordcount",
                        content_style:
                          "body { font-family:Inter,Arial; font-size:16px }",
                        skin: mode === "dark" ? "oxide-dark" : "oxide",
                        content_css: mode === "dark" ? "dark" : "light",
                      }}
                    />
                  </>
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Be concise with your answer
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="button"
              className="primary-gradient w-fit text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;