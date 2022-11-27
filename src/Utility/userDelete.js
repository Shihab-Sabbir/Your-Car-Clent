import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import { logOut } from './logout';

export const handleDeleteUser = (id, setUpdateState, setDataLoading, uid, updateState, user, setUser, navigate) => {
    confirmAlert({
        message: 'Are you sure to remove this user ?',
        buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    setDataLoading(true)
                    fetch(`https://your-car-server.vercel.app/delete-user/${id}?uid=${uid}`, {
                        method: 'DELETE',
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('your-car-token')}`
                        }
                    }).then(res => {
                        console.log(res)
                        if (res.status == 403) {
                            return logOut(user, setUser, navigate);
                        }
                        else { return res.json() }
                    }).then(data => {
                        if (data.modifiedCount > 0 || data.matchedCount > 0) {
                            toast.success('User removed !');
                            setUpdateState(!updateState);
                            setDataLoading(false);
                        }
                    }).catch(err => { console.log(err); setDataLoading(false) })
                }
            },
            {
                label: 'No',
                onClick: () => { setDataLoading(false) }
            }
        ]
    });

}



// 