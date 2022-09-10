import Image from "next/image";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Input from "../../components/atoms/input";
import Sidebar from "../../components/organisms/Sidebar";
import { JWTPayloadTypes, UserTypes } from "../../services/data-types";
import jwtDecode from "jwt-decode";
import { updateProfile } from "../../services/player";
import { toast } from "react-toastify";

export default function editProfile() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    avatar: "",
    id: "",
  });
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const userFromPayload: UserTypes = payload.player;
      setUser(userFromPayload);
    }
  }, []);

  const onSubmit = async () => {
    const data = new FormData();
    data.append("image", user.avatar);
    data.append("name", user.name);
    const response = await updateProfile(data, user.id);
    if (response.error) {
      toast.error(response.message);
    } else {
      Cookies.remove("token");
      router.push("/sign-in");
    }
  };

  return (
    <section className="edit-profile overflow-auto">
      <Sidebar activeMenu="settings" />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
          <div className="bg-card pt-30 ps-30 pe-30 pb-30">
            <form action="">
              <div className="photo d-flex">
                {/* <div className="position-relative me-20">
                  <img
                    src={user.avatar}
                    width="90"
                    height="90"
                    className="avatar img-fluid img-upload"
                  />
                  <div className="avatar-overlay position-absolute top-0 d-flex justify-content-center align-items-center">
                    <Image src="/icon/trash.svg" width={24} height={24} />
                  </div>
                </div> */}
                <div className="image-upload">
                  <label htmlFor="avatar">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        width={90}
                        height={90}
                        className="avatar img-fluid img-upload"
                      />
                    ) : (
                      <Image
                        src={user.avatar}
                        width={90}
                        height={90}
                        className="avatar img-fluid img-upload"
                      />
                    )}
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                      if (
                        !event.target.files ||
                        event.target.files.length === 0
                      ) {
                        return;
                      }
                      const img = event.target.files[0];
                      setImagePreview(URL.createObjectURL(img));
                      return setUser({
                        ...user,
                        avatar: URL.createObjectURL(event.target.files[0]),
                      });
                    }}
                  />
                </div>
              </div>
              <div className="pt-30">
                <Input
                  label="Full Name"
                  value={user.name}
                  onChange={(event) =>
                    setUser({ ...user, name: event.target.value })
                  }
                />
              </div>
              <div className="pt-30">
                <Input label="Email Address" value={user.email} disabled />
              </div>
              <div className="pt-30">{/* <Input label="Phone" /> */}</div>
              <div className="button-group d-flex flex-column pt-50">
                <button
                  type="button"
                  className="btn btn-save fw-medium text-lg text-white rounded-pill"
                  onClick={onSubmit}
                >
                  Save My Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}
