import { CircularProgress } from "@mui/material";
import { memo } from "react";
import { Main } from "../../style";

const Loader = memo(({ className }: { className?: string }) => {
  return (
    <Main className="w-full h-screen flex items-center justify-center">
      <CircularProgress color="warning" className={className} />
    </Main>
  );
});

export default Loader;
