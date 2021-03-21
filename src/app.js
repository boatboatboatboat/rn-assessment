import React from "react";
import {useColorScheme} from "react-native";
import {Provider} from "react-redux";
import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {fetchPosts} from "./reducers/posts";
import {DetailedPost} from "./screens/detail";
import store from "./store";
import {PostList} from "./screens/posts";

const Stack = createStackNavigator();

// Fetch all the posts from the server at startup
store.dispatch(fetchPosts());

function App() {
    const colorScheme = useColorScheme();

    return (
        <Provider store={store}>
            <NavigationContainer
                theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
                <Stack.Navigator initialRouteName="Posts">
                    <Stack.Screen name="Posts" component={PostList} />
                    <Stack.Screen
                        name="Detailed"
                        component={DetailedPost}
                        options={{title: "Details"}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default App;
