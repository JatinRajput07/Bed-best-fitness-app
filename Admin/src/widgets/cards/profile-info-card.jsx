import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, Input, Typography } from "@material-tailwind/react";

export function ProfileInfoCard({ user }) {

  console.log(user, ' ========')

  if (!user) {
    return (
      <Card color="transparent" shadow={false} className="border-blue-gray-100 rounded-lg">
        <CardHeader color="transparent" shadow={false} floated={false} className="mx-0 mt-0 mb-4 flex items-center justify-between">
          <Typography variant="h6" color="blue-gray">Profile Information</Typography>
        </CardHeader>
        <CardBody className="p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            No user information available.
          </Typography>
        </CardBody>
      </Card>
    );
  }

  const userInfo = [
    { label: "First Name", value: user?.name },
    { label: "Email", value: user?.email },
    { label: "Phone", value: user?.phone },
    { label: "Location", value: `${user?.city || ""} ${user?.State || ""} ${user?.Country || ""}`.trim() },
    { label: "ABHA_No", value: user?.ABHA_No },
    { label: "AadharNo", value: user?.AadharNo },
    { label: "Alternative ContactNo", value: user?.AlternativeContactNo },
    { label: "Business Address", value: user?.BusinessAddress },
    { label: "Favourite Author", value: user?.FavouriteAuthor },
    { label: "First Report Date", value: user?.FirstReportDate?.split("T")[0] },
    { label: "Goal", value: user?.Goal },
    { label: "Health Insurance Company", value: user?.HealthInsuranceCompany },
    { label: "Health Insurance No", value: user?.HealthInsuranceNo },
    { label: "Journey Start Date", value: user?.JourneyStartDate?.split("T")[0] },
    { label: "Nationality", value: user?.Nationality },
    { label: "Occupation", value: user?.Occupation },
    { label: "Office Address", value: user?.OfficeAddress },
    { label: "Oritation Date", value: user?.OritationDate },
    { label: "ReferBy", value: user?.ReferBy },
    { label: "SOS Contact No", value: user?.SOS_Contact_No },
    { label: "Relation With SOS", value: user?.RelationWithSOS },
    { label: "Date of Birth", value: user?.DOB },
    { label: "Gender", value: user?.Gender },


    { label: "ADS ID", value: user?.additionalInfo?.ADS_id },
    { label: "Address", value: user ?.additionalInfo?.address },
    { label: "Batch No.", value: user?.additionalInfo?.batchNo },
    { label: "Joining Date", value: user?.additionalInfo?.joiningDate.split('T')[0] },
  ];

  const filteredUserInfo = userInfo.filter(field => field.value !== null && field.value !== undefined && field.value !== "");

  return (
    <Card color="transparent" shadow={false} className="border-blue-gray-100 rounded-lg">
      <CardHeader color="transparent" shadow={false} floated={false} className="mx-0 mt-0 mb-4 flex items-center justify-between">
        <Typography variant="h6" color="blue-gray">Profile Information</Typography>
      </CardHeader>
      <CardBody className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUserInfo.map((field, index) => (
            <div key={index}>
              <Input
                label={field.label}
                value={field.value}
                variant="outlined"
                color="blue-gray"
                readOnly
              />
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

ProfileInfoCard.displayName = "ProfileInfoCard";

export default ProfileInfoCard;
