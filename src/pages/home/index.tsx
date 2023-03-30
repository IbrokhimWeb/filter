import { useState, useEffect, lazy, Suspense } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { Pagination } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Description, Main, Section, Space } from "../../style";

import { HomeFilterType } from "../../static/types";
import countrys from "../../static/countrys.json";
import regions from "../../static/regions.json";

import { TbFilter } from "react-icons/tb";
import { BsSearch } from "react-icons/bs";
const Cards = lazy(() => import(`../../components/cards`));
import $axios from "../../axios";
import { v4 } from "uuid";

const Home = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  console.log(search);
  const [reload, setReload] = useState<number>(1);
  const [data, setData] = useState<any>(null);
  const [filter, setFilter] = useState<HomeFilterType>({
    country: "Välj län",
    region: "Välj län",
    organ: "Välj beslutande organ",
    file_date: "Välj år",
    ordering: "file_date",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await $axios.get(
          `/files/?page=${page}&search=${search}&country=${filter?.country}&region=${filter?.region}&organ=${filter?.organ}&file_date=${filter?.file_date}&ordering=${filter?.ordering}`
        );
        setData(res?.data);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [page, filter, reload]);

  const handleChange = ({ target }: SelectChangeEvent<string>) => {
    setFilter((prev: HomeFilterType) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  return (
    <Suspense
      fallback={
        <Main className="w-full h-full flex items-center justify-center">
          <CircularProgress color="warning" />
        </Main>
      }
    >
      <Main className="w-full min-h-screen flex flex-col items-center justify-start py-10 px-20 max-[1000px]:px-0">
        <Section className="w-full h-auto flex items-center gap-5 py-5 px-10 max-[700px]:px-0">
          <TextField
            type="search"
            size="medium"
            placeholder="Sök efter protokoll..."
            variant="standard"
            color="warning"
            value={search}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BsSearch className="text-[1.5rem] mr-2 mb-1" />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
          <Button
            size="large"
            variant="contained"
            color="warning"
            onClick={() => {
              setReload((prev: number) => prev + 1);
            }}
          >
            Sök
          </Button>
        </Section>

        <Space />

        <Section className="w-full flex grid-cols-2 items-center justify-between px-10 max-[1250px]:grid max-[1250px]:gap-5 max-[700px]:px-0 max-[550px]:grid-cols-1 max-[550px]:gap-2">
          <Select
            size="small"
            color="warning"
            value={filter?.country == "" ? "Salom" : filter?.country}
            name="country"
            onChange={handleChange}
            className="min-w-[200px] bg-white text-[.8rem]"
          >
            <MenuItem value={"Välj län"}>Välj län</MenuItem>
            {Object.entries(countrys)?.map((e) => (
              <MenuItem key={v4()} value={e[0]}>
                {e[1]}
              </MenuItem>
            ))}
          </Select>
          <Select
            size="small"
            color="warning"
            name="region"
            value={filter?.region}
            onChange={handleChange}
            className="min-w-[200px] bg-white text-[.8rem]"
          >
            <MenuItem value={"Välj län"}>Välj län</MenuItem>
            {Object.entries(regions)?.map((e) => (
              <MenuItem key={v4()} value={e[0]}>
                {e[1]}
              </MenuItem>
            ))}
          </Select>
          <Select
            size="small"
            color="warning"
            name="organ"
            value={filter?.organ}
            onChange={handleChange}
            className="min-w-[200px] bg-white text-[.8rem]"
          >
            <MenuItem value={"Välj beslutande organ"}>
              Välj beslutande organ
            </MenuItem>
            <MenuItem value={"s"}>kommunstyrelsen</MenuItem>
            <MenuItem value={"f"}>kommunfullmäktige</MenuItem>
          </Select>
          <Select
            size="small"
            color="warning"
            name="file_date"
            value={filter?.file_date}
            onChange={handleChange}
            className="min-w-[200px] bg-white text-[.8rem]"
          >
            <MenuItem value={"Välj år"}>Välj år</MenuItem>
            <MenuItem value={"2023"}>2023</MenuItem>
            <MenuItem value={"2022"}>2022</MenuItem>
            <MenuItem value={"2021"}>2021</MenuItem>
            <MenuItem value={"2020"}>2020</MenuItem>
            <MenuItem value={"2019"}>2019</MenuItem>
            <MenuItem value={"2018"}>2018</MenuItem>
          </Select>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => {
              setFilter({
                country: "Välj län",
                region: "Välj län",
                organ: "Välj beslutande organ",
                file_date: "Välj år",
                ordering: "file_date",
              });
              setSearch("");
            }}
            className="capitalize max-[1250px]:hidden"
          >
            Rensa filtrering
          </Button>
        </Section>

        <Space />

        <Section className="w-full px-20 max-[1250px]:px-10 max-[700px]:px-0">
          <Section className="w-full flex items-end justify-between">
            <Description>{data?.count} resultat</Description>
            <Select
              startAdornment={
                <TbFilter className="text-[2rem] text-gray-500 mr-2" />
              }
              size="small"
              color="warning"
              name="ordering"
              value={filter?.ordering}
              defaultValue="Sortera på relevans"
              onChange={handleChange}
              className="min-w-[200px] max-[1250px]:hidden"
            >
              <MenuItem value={"file_date"}>Sortera på relevans</MenuItem>
              <MenuItem value={"-file_date"}>-file_date</MenuItem>
            </Select>
          </Section>

          <Space />
          <Section className="w-full min-h-[50vh]">
            {data?.results.map((el: any) => (
              <Cards key={v4()} search={search} data={el} />
            ))}
          </Section>

          <Space />
          <Section className="w-full flex justify-center">
            <Pagination
              size="small"
              variant="outlined"
              shape="rounded"
              count={Math.ceil(+data?.count / 10)}
              page={page}
              onChange={(e, p: number) => setPage(p)}
            />
          </Section>
        </Section>
      </Main>
    </Suspense>
  );
};

export default Home;
