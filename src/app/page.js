import Room from "@/component/Room";
import GateWay from "@/Gateway";
import { AuthProvider } from "@/utils/AuthContext";
import Login from "./Login/page";

export default function Home() {
  return (
    <div>
      <AuthProvider>
        <GateWay>
          <Room />
        </GateWay>
      </AuthProvider>
    </div>
  );
}
