import { memo, useEffect } from "react";

import { Card, Button } from "@mui/material";
import { Description, Div, Image, Section, Space, Title } from "../../style";

import { RiScales3Line } from "react-icons/ri";
import { BsBuildings, BsBook, BsDownload } from "react-icons/bs";
import { CiLocationOn, CiViewList } from "react-icons/ci";
import { FiSave } from "react-icons/fi";
import { v4 } from "uuid";

const Cards = memo(({ search, data }: any) => {
  const hanldeDownload = async () => {
    try {
      await fetch(data?.file).then((response) => {
        response.blob().then((blob) => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          a.download = "file.pdf";
          a.click();
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Section>
      <Card className="flex gap-5 p-7 max-[700px]:p-5">
        <Section>
          <Div className="flex items-center gap-3">
            <Image
              src={data?.logo}
              alt=""
              className="w-[60px] max-h-[60px]  max-[1250px]:block max-[700px]:w-[50px] max-[700px]:h-[50px]"
            />
            <Div className="max-[550px]:flex max-[550px]:flex-col-reverse">
              <Title className="max-[500px]:text-[1.3rem] max-[400px]:text-[1.1rem]">
                {data?.country} | {data?.region} | {data?.organ}{" "}
                <span className="max-[1250px]:hidden ">
                  | {data?.file_date}
                </span>
              </Title>
              <Section className="flex items-center gap-3">
                <Div className="flex gap-2 items-center">
                  <BsBuildings className="text-gray-500 max-[550px]:text-[.80rem] max-[500px]:text-[.60rem] max-[400px]:text-[.50rem]" />
                  <Description className=" max-[550px]:text-[.80rem] max-[500px]:text-[.60rem] max-[400px]:text-[.50rem]">
                    {data?.country}
                  </Description>
                </Div>
                <Div className="flex gap-2 items-center">
                  <CiLocationOn className="text-gray-500 max-[550px]:text-[.80rem] max-[500px]:text-[.60rem] max-[400px]:text-[.50rem]" />
                  <Description className=" max-[550px]:text-[.80rem] max-[500px]:text-[.60rem] max-[400px]:text-[.50rem]">
                    {data?.region}
                  </Description>
                </Div>
                <Div className="flex gap-2 items-center">
                  <RiScales3Line className="text-gray-500 max-[550px]:text-[.80rem] max-[500px]:text-[.60rem] max-[400px]:text-[.50rem]" />
                  <Description className=" max-[550px]:text-[.80rem] max-[500px]:text-[.60rem] max-[400px]:text-[.50rem]">
                    {data?.organ}
                  </Description>
                </Div>
              </Section>
            </Div>
          </Div>
          <Space />
          <Description id="content" className="max-[400px]:text-[.80rem]">
            {search?.length
              ? data?.about_text
                  .replace(
                    new RegExp(search, "gi"),
                    (text: any) => `**${text}**`
                  )
                  .split("**")
                  .map((text: string, index: number) =>
                    index % 2 === 1 ? <mark key={v4()}>{text}</mark> : text
                  )
              : data?.about_text}
          </Description>
          <Space />
          <Section className="w-full flex items-center justify-between">
            <Div className="flex items-center gap-3 max-[450px]:hidden">
              <Div className="flex items-center gap-2">
                <FiSave className="text-gray-500" />
                <Description>{data?.size}Mb</Description>
              </Div>
              <Div className="flex items-center gap-2">
                <CiViewList className="text-gray-500" />
                <Description>{data?.pages}</Description>
              </Div>
            </Div>
            <Div>
              <Button
                target="_blank"
                href={data?.file}
                size="small"
                variant="contained"
                color="warning"
                endIcon={<BsBook />}
                className="capitalize mr-5"
              >
                Öppna
              </Button>
              <Button
                // download={data?.file}
                onClick={hanldeDownload}
                size="small"
                variant="contained"
                color="warning"
                endIcon={<BsDownload />}
                className="capitalize"
              >
                Ladda-ner
              </Button>
            </Div>
          </Section>
        </Section>
      </Card>
      <Space />
    </Section>
  );
});

export default Cards;
