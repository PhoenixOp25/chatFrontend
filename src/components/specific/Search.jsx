import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
 import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
// import { useDispatch, useSelector } from "react-redux";
// import { useAsyncMutation } from "../../hooks/hook";
// import {
//   useLazySearchUserQuery,
//   useSendFriendRequestMutation,
// } from "../../redux/api/api";
// import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";

const Search = () => {
  // const { isSearch } = useSelector((state) => state.misc);

  // const [searchUser] = useLazySearchUserQuery();

  // const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
  //   useSendFriendRequestMutation
  // );

  //const dispatch = useDispatch();

  const search = useInputValidation("");
  let isLoadingSendFriendRequest=false;
   const [users, setUsers] = useState(sampleUsers);

  const addFriendHandler = (id) => {
    // await sendFriendRequest("Sending friend request...", { userId: id });
    console.log(id);
  };

  // const searchCloseHandler = () => dispatch(setIsSearch(false));

  // useEffect(() => {
  //   const timeOutId = setTimeout(() => {
  //     searchUser(search.value)
  //       .then(({ data }) => setUsers(data.users))
  //       .catch((e) => console.log(e));
  //   }, 1000);

  //   return () => {
  //     clearTimeout(timeOutId);
  //   };
  // }, [search.value]);

  return (
    //={isSearch} onClose={searchCloseHandler}
    <Dialog open>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={addFriendHandler}
               handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;