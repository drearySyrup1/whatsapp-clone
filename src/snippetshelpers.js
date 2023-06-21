// to add field
useEffect(() => {
  const editFields = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));

    const updatePromises = querySnapshot.docs.map(async (doc) => {
      await updateDoc(doc.ref, { friends: [] });
    });

    await Promise.all(updatePromises);
  };

  editFields();
}, []);
