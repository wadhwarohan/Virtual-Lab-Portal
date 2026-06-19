import { Inngest } from "inngest";
import LeaveApplication from "../models/LeaveApplication.js";
import Employee from "../models/Employee.js";
import sendEmail from "../config/nodemailer.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "Vlab-EMS" });


//send email to admin, if admin does not take action in 24 hours
const leaveApplicationReminder = inngest.createFunction(
  { id: "leave-application-reminder", triggers: [{ event: "leave/pending" }] },
  async ({ event, step }) => {
    const { leaveApplicationId } = event.data

    //wait for 24 hours
    await step.sleepUntil("Wait for 24 hours",new Date(new Date().getTime() + 24 * 60 * 60 * 1000))

    const leaveApplication = await LeaveApplication.findById(leaveApplicationId)

    if(leaveApplication?.status === "PENDING"){
        const employee = await Employee.findById(leaveApplication.employeeId)

        //send remainder mail to admin
        await sendEmail({
            to: process.env.admin_email,
            subject: `Leave Application Reminder`,
            body: `<div style ="max-width:600px;">
            <h2>Hi Admin,</h2>
            <p style="font-size:16px;">You have a leave application today</p>
            <p style="font-size: 18px; font-weight:bold; color: #007bff; margin:8px 0;">${leaveApplication?.startDate?.toLocaleDateString()}</p>
            <p style="font-size:16px;">Please make sure to action on this leave Application</p>
            <br />
            <p style="font-size: 16px;">Best Regards</p>
            <p style="font-size: 16px;">EMS</p></div>`
        })

    }
   
  },
);

// Create an empty array where we'll export future Inngest functions
export const functions = [leaveApplicationReminder];