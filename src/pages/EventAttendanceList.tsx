import {
    ButtonRipple,
    Card,
    Circle,
    Limit,
    Pagination,
    Tables,
    TextField,
    Tooltip
} from "@/components";
import { useState } from "react";
import { TbDotsVertical, TbEye, TbTrash } from "react-icons/tb";

const EventAttendanceList = () => {
    const [limit, setLimit] = useState(10);
    const [pageActive, setPageActive] = useState(1);

    const [data] = useState([
        {
            id: 1,
            name: "John Doe",
            email: "johndoegmail.com",
        },
        {
            id: 2,
            name: "Jane Doe",
            email: "janedoegmail.com",
        },
        {
            id: 3,
            name: "John Smith",
            email: "johnsmithgmail.com",
        },
        {
            id: 4,
            name: "John Wick",
            email: "johnwickgmail.com",
        },
        {
            id: 5,
            name: "John Krasinski",
            email: "johnkrasinskigmail.com",
        },
        {
            id: 6,
            name: "John Cena",
            email: "johncenagmail.com",
        },
        {
            id: 7,
            name: "John Legend",
            email: "johnlegendgmail.com",
        },
        {
            id: 8,
            name: "John Mayer",
            email: "johnmayergmail.com",
        },
        {
            id: 9,
            name: "John Travolta",
            email: "johntravoltagmail.com",
        },
        {
            id: 10,
            name: "John Mulaney",
            email: "johnmulaneygmail.com",
        },
        {
            id: 11,
            name: "John Oliver",
            email: "johnolivergmail.com",
        },
        {
            id: 12,
            name: "John Lennon",
            email: "johnlennongmail.com",
        },
    ]);

    return (
        <div className="min-h-screen overflow-x-hidden p-10">
            <Circle />
            <Card>
                <div className="p-10">
                    {/* Control Top */}
                    <div className="flex items-center mb-4">
                        <div className="text-xl font-bold text-center">
                            Event Attendance List
                        </div>
                    </div>
                    <div className="mb-4 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4">
                        <div className="w-full sm:w-60">
                            <TextField placeholder="Search" />
                        </div>
                    </div>

                    {/* Tables */}
                    <Tables>
                        <Tables.Head>
                            <Tables.Row>
                                <Tables.Header>ID</Tables.Header>
                                <Tables.Header>Name</Tables.Header>
                                <Tables.Header>Email</Tables.Header>
                                <Tables.Header center>Action</Tables.Header>
                            </Tables.Row>
                        </Tables.Head>
                        <Tables.Body>
                            {data
                                .slice((pageActive - 1) * limit, limit * pageActive)
                                .map((item: any, idx: any) => (
                                    <Tables.Row
                                        key={idx}
                                    >
                                        <Tables.Data>{item.id}</Tables.Data>
                                        <Tables.Data>{item.name}</Tables.Data>
                                        <Tables.Data>{item.email}</Tables.Data>
                                        <Tables.Data center>
                                            <div className="flex items-center justify-center">
                                                <Tooltip tooltip="Lihat">
                                                    <ButtonRipple
                                                        stopPropagation
                                                        className="p-2 rounded-full transition-[background] hover:bg-white/10"
                                                    >
                                                        <TbEye className="text-xl text-blue-400" />
                                                    </ButtonRipple>
                                                </Tooltip>
                                                <Tooltip tooltip="Hapus">
                                                    <ButtonRipple
                                                        stopPropagation
                                                        className="p-2 rounded-full transition-[background] hover:bg-white/10"
                                                    >
                                                        <TbTrash className="text-xl text-red-400" />
                                                    </ButtonRipple>
                                                </Tooltip>
                                                <Tooltip tooltip="Lainnya">
                                                    <ButtonRipple
                                                        stopPropagation
                                                        className="p-2 rounded-full transition-[background] hover:bg-white/10"
                                                    >
                                                        <TbDotsVertical className="text-xl" />
                                                    </ButtonRipple>
                                                </Tooltip>
                                            </div>
                                        </Tables.Data>
                                    </Tables.Row>
                                ))}
                        </Tables.Body>
                    </Tables>

                    {/* Control Bottom */}
                    <div className="mt-4 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4">
                        <div className="flex gap-2 items-baseline text-sm">
                            <Limit
                                limit={limit}
                                setLimit={setLimit}
                                onChange={() => setPageActive(1)}
                            />
                            {data.length} entries
                        </div>

                        <Pagination
                            totalCount={data.length}
                            onPageChange={(page) => {
                                setPageActive(page);
                            }}
                            currentPage={pageActive}
                            pageSize={limit}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default EventAttendanceList;
