import { useCallback, useContext, useEffect } from "react";
import { Context } from "../../Storage/Context";
import { UserManual } from "./UserManual";

const UnDoneWork = (flag = false) => {
    const { openAlert, GET_KEY } = useContext(Context);
    const { manual } = UserManual();
    useEffect(() => {
        if (flag) work
    }, [])

    const work = useCallback((props) => {
        console.log({
            type: props["type"],
            id: props["id"],
            navigation: props.navigation.goBack(),
        })
        switch (props["type"]) {
            case "type":
                manual({
                    id: props["id"],
                    navigation: props["navigation"]
                })
                break;
            case "null":
                // ادامه دهد نمایش پیام نارنجی
                openAlert('warning', 'خطا', props["msg"])
                break;
            case "error":
                // نمایش پیام قرمز
                openAlert('error', 'خطا', props["msg"])
                // props.navigation.navigate('LivesToday');
                break;
            case "action":
                props.navigation.navigate('alarm');
                break;
            case "normal":
                // ادامه دهد و نمایش پیام سبز
                openAlert('success', 'خطا', props["msg"])
                break;
            default:
                break;
        }
    }, [])
    return { work }
}
export { UnDoneWork }