import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  return (
    <div class="main">
      <h1>
        This site is crypto {""}
        <em>
          <mark>yellow pages.</mark>
        </em>
        <br />
        You can leave your contacts or find someone else's!
      </h1>
      <div class="navigation">
        <button class="find" onClick={() => router.push("/show")}>
          Find someone
        </button>
        <button class="leave" onClick={() => router.push("/add")}>
          Leave your contacts
        </button>
      </div>
    </div>
  );
};

export default Index;
