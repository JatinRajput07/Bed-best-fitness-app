import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, Input, Typography } from "@material-tailwind/react";

export function ProfileInfoCard({ user }) {
  return (
    <Card color="transparent" shadow={false} className=" border-blue-gray-100 rounded-lg">
      <CardHeader
        color="transparent"
        shadow={false}
        floated={false}
        className="mx-0 mt-0 mb-4 flex items-center justify-between"
      >
        <Typography variant="h6" color="blue-gray">
          Profile Information
        </Typography>
      </CardHeader>
      <CardBody className="p-4">
        {user ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* First Row */}
            <div>
              <Input
                label="First Name"
                value={user["first name"]}
                onChange={(e) => console.log("First Name:", e.target.value)}
                variant="outlined"
                color="blue-gray"
              />
            </div>
            <div>
              <Input
                label="Last Name"
                value={user["last name"]}
                onChange={(e) => console.log("Last Name:", e.target.value)}
                variant="outlined"
                color="blue-gray"
              />
            </div>
            <div>
              <Input
                label="Email"
                value={user.email}
                onChange={(e) => console.log("Email:", e.target.value)}
                variant="outlined"
                color="blue-gray"
              />
            </div>

            {/* Second Row */}
            <div>
              <Input
                label="Mobile"
                value={user.mobile}
                onChange={(e) => console.log("Mobile:", e.target.value)}
                variant="outlined"
                color="blue-gray"
              />
            </div>
            <div>
              <Input
                label="Location"
                value={user.location}
                onChange={(e) => console.log("Location:", e.target.value)}
                variant="outlined"
                color="blue-gray"
              />
            </div>
            <div>
              <Input
                label="Membership Level"
                value={user["membership level"]}
                onChange={(e) => console.log("Membership Level:", e.target.value)}
                variant="outlined"
                color="blue-gray"
              />
            </div>

            {/* Third Row */}
            <div>
              <Input
                label="Date of Birth"
                value={user.dob}
                onChange={(e) => console.log("Date of Birth:", e.target.value)}
                variant="outlined"
                color="blue-gray"
              />
            </div>
            <div>
              <Input
                label="Gender"
                value={user.gender}
                onChange={(e) => console.log("Gender:", e.target.value)}
                variant="outlined"
                color="blue-gray"
              />
            </div>
          </div>
        ) : (
          <Typography variant="small" color="blue-gray" className="font-normal">
            No user information available.
          </Typography>
        )}
      </CardBody>
    </Card>
  );
}

ProfileInfoCard.propTypes = {
  user: PropTypes.object.isRequired,
};

ProfileInfoCard.displayName = "ProfileInfoCard";

export default ProfileInfoCard;
