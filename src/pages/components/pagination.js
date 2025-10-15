import { Pagination } from "@mui/material";
import { Stack } from "@mui/material";

export default function PokePagination({page, totalPages, setOffset, setPage}) {

    function handlePageChange (event, value) {
        setOffset((value - 1) * 20);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setPage(value);

    }

    return (
        <Stack spacing={2}>
            <Pagination 
                className="poke-pagination"
                count={totalPages} 
                page={page}
                color="primary"
                onChange={handlePageChange}
                size="large"
            />
        </Stack>
    );
}