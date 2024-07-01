import MainNavigator from "./src/navigation/MainNavigator";
import {useFonts} from "expo-font";
import {fonts} from "./src/global/fonts"
import {Provider} from "react-redux";
import store from "./src/store/index"
import {dropTableReclamos, init, initReclamosGuardados} from "./src/db";

init()
    .catch((err) => {
        console.error(err);
    })

initReclamosGuardados()
    .catch(err => console.error(err))

export default function App() {
    const [fontsLoaded, fontError] = useFonts(fonts);
    if (!fontsLoaded && !fontError) {
        return null
    }

    return (
        <Provider store={store}>
            <MainNavigator/>
        </Provider>
    );
}
