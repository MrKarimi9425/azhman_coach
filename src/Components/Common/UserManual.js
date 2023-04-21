import React, { useCallback, useEffect, useContext } from 'react';
import { Context } from '../../Storage/Context';
import { baseUrl, url } from './Address';
import { isSet } from './index'
const UserManual = (flag = false) => {
    const { GET_KEY, openAlert } = useContext(Context)
    useEffect(() => {
        if (flag) {
            manual();
        }
    }, []);

    const manual = useCallback(async (props) => {
        await fetch(`${baseUrl}${url}activation/access_check`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${GET_KEY}`
            },
            body: JSON.stringify({
                idCourse: props.id
            })
        }).then(response => response.json())
            .then(json => {
                if (isSet(json)) {
                    console.log(json)
                    switch (json.type) {
                        case "error":
                            alert(json)
                            break;
                        case "requestNotLevel":
                            // پیام زمان ثبت نام به پایان رسیده است
                            props.navigation.navigate('Main')
                            break;
                        case "notDoing":
                            // صفحه فرم سوالات
                            props.navigation.navigate('Questions', { id: props.id })
                            break;
                        case "doing":
                            // نمایش دوره های خریداری شده + پیام
                            props.navigation.navigate('PurchasedCourses', { id: props.id })
                            openAlert('warning', 'تایید', json.msg)

                            break;
                        case "factorPaid":
                            // به صفحه اصلی و نمایش پیام ""
                            props.navigation.navigate('Main')
                            openAlert('success', 'تایید', json.msg)
                            break;
                        case "paymentOffline":
                            // نمایش پیام در انتظار کارشناس
                            props.navigation.navigate('Main')
                            openAlert('success', 'تایید', json.msg)
                            break;
                        case "factorIssued":
                            props.navigation.navigate('Factor');
                            // به صفحه فاکتور ها
                            break;
                        case "requestFullLevel":
                            props.navigation.navigate('ServiceDetails');
                            break;
                        default:
                            break;
                    }
                }
            }).catch(err => console.log(err))
    }, [])
    return { manual }
}

export { UserManual }