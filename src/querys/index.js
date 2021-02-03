export const cartQuery = (uid) => {
  if (uid !== undefined) {
    return [
      {
        collection: "users",
        doc: uid,
        storeAs: "profile",
      },
      // {
      //   collection: "users",
      //   doc: uid,
      //   subcollections: [{ collection: "cart" }],
      //   storeAs: "cart",
      // },
    ];
  } else {
    return [];
  }
};
export const cartProductsQuery = (uid) => {
  console.log(uid)
  if (uid !== undefined) {
    return [
      {
        collection: "users",
        doc: uid,
        subcollections: [{ collection: "cart" }],
        storeAs: "cart",
      },
    ];
  } else {
    return [];
  }
};
