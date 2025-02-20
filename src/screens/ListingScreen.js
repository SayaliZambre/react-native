/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

export default function ListingScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`)
      .then(res => setPosts([...posts, ...res.data]));
  }, [page]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => setPage(page + 1)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Details", { id: item.id })}>
            <Text style={styles.item}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#121212", justifyContent: "center", alignItems: "center" },
    title: { fontSize: 28, color: "white", marginBottom: 20 },
    input: { backgroundColor: "#333", color: "white", width: "80%", padding: 10, margin: 10, borderRadius: 5 },
    button: { backgroundColor: "#1DB954", padding: 10, borderRadius: 5, width: "80%", alignItems: "center" },
    buttonText: { color: "white", fontSize: 18 },
    link: { color: "#1DB954", marginTop: 10 },
    error: { color: "red" },
  });
  