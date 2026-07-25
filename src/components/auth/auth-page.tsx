import { UserType } from "@/types/shared";

interface AuthPageProps {
  profile: UserType;
}

function AuthPage({ profile }: AuthPageProps) {
  return (
    <section className="mx-auto my-20 w-full max-w-md rounded-xl bg-white p-6 text-center shadow-2xl md:my-0">
      {profile === UserType.Individual ? (
        <div>Individual login page goes here</div>
      ) : (
        <div>Company Demo login page goes here</div>
      )}
    </section>
  );
}

export default AuthPage;
