import { useSelector } from "react-redux";

export default function AdminAvtarImg({lg}) {

    const { adminData } = useSelector((state) => state.AdminSliceProvider);
    return (
        <>
              <div className={`adminImg`}>
                    <span className={`rounded-circle ${lg===true && 'lg'}`}>
                      <img
                        src={adminData.data.profileImg}
                        alt=""
                        className=""
                      />
                    </span>
                  </div>
        </>
    )
}