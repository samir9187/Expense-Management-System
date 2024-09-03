// import React, { useState, useEffect } from "react";
// import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
// import {
//   UnorderedListOutlined,
//   AreaChartOutlined,
//   EditOutlined,
//   DeleteOutlined,
// } from "@ant-design/icons";
// import Layout from "./../components/Layout/Layout";
// import axios from "axios";
// import Spinner from "./../components/Spinner";
// import moment from "moment";
// import Analytics from "../components/Analytics";
// const { RangePicker } = DatePicker;

// const HomePage = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [allTransection, setAllTransection] = useState([]);
//   const [frequency, setFrequency] = useState("7");
//   const [selectedDate, setSelectedate] = useState([]);
//   const [type, setType] = useState("all");
//   const [viewData, setViewData] = useState("table");
//   const [editable, setEditable] = useState(null);
//   // const [form] = Form.useForm();
//   const [formValues, setFormValues] = useState({
//     amount: "",
//     type: "income",
//     category: "salary",
//     date: "",
//     reference: "",
//     description: "",
//   });
//   //table data
//   const columns = [
//     {
//       title: "Date",
//       dataIndex: "date",
//       render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
//     },
//     {
//       title: "Amount",
//       dataIndex: "amount",
//     },
//     {
//       title: "Type",
//       dataIndex: "type",
//     },
//     {
//       title: "Category",
//       dataIndex: "category",
//     },
//     {
//       title: "Refrence",
//       dataIndex: "refrence",
//     },
//     {
//       title: "Actions",
//       render: (text, record) => (
//         <div>
//           <EditOutlined
//             onClick={() => {
//               setEditable(record);
//               setFormValues(record);
//               setShowModal(true);
//             }}
//           />
//           <DeleteOutlined
//             className="mx-2"
//             onClick={() => {
//               handleDelete(record);
//             }}
//           />
//         </div>
//       ),
//     },
//   ];

//   //getall transactions

//   //useEffect Hook
//   // useEffect(() => {
//   const getAllTransactions = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       setLoading(true);
//       const res = await axios.post("/transections/get-transection", {
//         userid: user._id,
//         frequency,
//         selectedDate,
//         type,
//       });
//       setAllTransection(res.data);
//       setLoading(false);
//     } catch (error) {
//       message.error("Ftech Issue With Tranction");
//       setLoading(false);
//     }
//   };
//   // getAllTransactions();
//   // }, [frequency, selectedDate, type]);
//   useEffect(() => {
//     getAllTransactions();
//   }, [frequency, selectedDate, type]);
//   //delete handler
//   const handleDelete = async (record) => {
//     try {
//       setLoading(true);
//       await axios.post("/transections/delete-transection", {
//         transacationId: record._id,
//       });
//       setLoading(false);
//       message.success("Transaction Deleted!");
//       getAllTransactions();
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//       message.error("unable to delete");
//     }
//   };

//   // form handling
//   const handleSubmit = async (values) => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user"));
//       setLoading(true);
//       if (editable) {
//         await axios.post("/transections/edit-transection", {
//           payload: {
//             ...values,
//             userId: user._id,
//           },
//           transacationId: editable._id,
//         });
//         setLoading(false);
//         message.success("Transaction Updated Successfully");
//       } else {
//         await axios.post("/transections/add-transection", {
//           ...values,
//           userid: user._id,
//         });
//         setLoading(false);
//         message.success("Transaction Added Successfully");
//       }
//       // form.resetFields();
//       setFormValues("");
//       setShowModal(false);
//       setEditable(null);
//       getAllTransactions();
//     } catch (error) {
//       setLoading(false);
//       message.error("please fill all fields");
//     }
//   };

//   return (
//     <Layout>
//       {loading && <Spinner />}
//       <div className="filters">
//         <div>
//           <h6>Select Frequency</h6>
//           <Select value={frequency} onChange={(values) => setFrequency(values)}>
//             <Select.Option value="7">LAST 1 Week</Select.Option>
//             <Select.Option value="30">LAST 1 Month</Select.Option>
//             <Select.Option value="365">LAST 1 year</Select.Option>
//             <Select.Option value="custom">custom</Select.Option>
//           </Select>
//           {frequency === "custom" && (
//             <RangePicker
//               value={selectedDate}
//               onChange={(values) => setSelectedate(values)}
//             />
//           )}
//         </div>
//         <div className="filter-tab ">
//           <h6>Select Type</h6>
//           <Select value={type} onChange={(values) => setType(values)}>
//             <Select.Option value="all">ALL</Select.Option>
//             <Select.Option value="income">INCOME</Select.Option>
//             <Select.Option value="expense">EXPENSE</Select.Option>
//           </Select>
//         </div>
//         <div className="switch-icons">
//           <UnorderedListOutlined
//             className={`mx-2 ${
//               viewData === "table" ? "active-icon" : "inactive-icon"
//             }`}
//             onClick={() => setViewData("table")}
//           />
//           <AreaChartOutlined
//             className={`mx-2 ${
//               viewData === "analytics" ? "active-icon" : "inactive-icon"
//             }`}
//             onClick={() => setViewData("analytics")}
//           />
//         </div>
//         <div>
//           <button
//             className="btn btn-primary"
//             onClick={() => setShowModal(true)}
//           >
//             Add New
//           </button>
//         </div>
//       </div>
//       <div className="content">
//         {viewData === "table" ? (
//           <Table columns={columns} dataSource={allTransection} />
//         ) : (
//           <Analytics allTransection={allTransection} />
//         )}
//       </div>
//       <Modal
//         title={editable ? "Edit Transaction" : "Add Transection"}
//         open={showModal}
//         onCancel={() => setShowModal(false)}
//         footer={false}
//       >
//         <Form
//           // form={form}
//           layout="vertical"
//           onFinish={handleSubmit}
//           initialValues={editable}
//         >
//           <Form.Item label="Amount" name="amount">
//             <Input type="text" required />
//           </Form.Item>
//           <Form.Item label="type" name="type">
//             <Select>
//               <Select.Option value="income">Income</Select.Option>
//               <Select.Option value="expense">Expense</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item label="Category" name="category">
//             <Select>
//               <Select.Option value="salary">Salary</Select.Option>
//               <Select.Option value="tip">Tip</Select.Option>
//               <Select.Option value="project">Project</Select.Option>
//               <Select.Option value="food">Food</Select.Option>
//               <Select.Option value="movie">Movie</Select.Option>
//               <Select.Option value="bills">Bills</Select.Option>
//               <Select.Option value="medical">Medical</Select.Option>
//               <Select.Option value="fee">Fee</Select.Option>
//               <Select.Option value="tax">TAX</Select.Option>
//             </Select>
//           </Form.Item>
//           <Form.Item label="Date" name="date">
//             <Input type="date" />
//           </Form.Item>
//           <Form.Item label="Refrence" name="refrence">
//             <Input type="text" required />
//           </Form.Item>
//           <Form.Item label="Description" name="description">
//             <Input type="text" required />
//           </Form.Item>
//           <div className="d-flex justify-content-end">
//             <button type="submit" className="btn btn-primary">
//               {" "}
//               SAVE
//             </button>
//           </div>
//         </Form>
//       </Modal>
//     </Layout>
//   );
// };

// export default HomePage;

import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import Spinner from "./../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  // Create a form reference
  const [form] = Form.useForm();

  // table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              form.setFieldsValue(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  // get all transactions
  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/transections/get-transection`,
        {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        }
      );
      setAllTransection(res.data);
      setLoading(false);
    } catch (error) {
      message.error("Fetch Issue With Transaction");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, [frequency, selectedDate, type]);

  // delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/transections/delete-transection`,
        {
          transacationId: record._id,
        }
      );
      setLoading(false);
      message.success("Transaction Deleted!");
      getAllTransactions();
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Unable to delete");
    }
  };

  // form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/transections/edit-transection`,
          {
            payload: {
              ...values,
              userId: user._id,
            },
            transacationId: editable._id,
          }
        );
        setLoading(false);
        message.success("Transaction Updated Successfully");
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/transections/add-transection`,
          {
            ...values,
            userid: user._id,
          }
        );
        setLoading(false);
        message.success("Transaction Added Successfully");
      }
      form.resetFields(); // Reset the form fields
      setShowModal(false);
      setEditable(null);
      getAllTransactions();
    } catch (error) {
      setLoading(false);
      message.error("Please fill all fields");
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedate(values)}
            />
          )}
        </div>
        <div className="filter-tab ">
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">INCOME</Select.Option>
            <Select.Option value="expense">EXPENSE</Select.Option>
          </Select>
        </div>
        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("analytics")}
          />
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={allTransection} />
        ) : (
          <Analytics allTransection={allTransection} />
        )}
      </div>
      <Modal
        title={editable ? "Edit Transaction" : "Add Transaction"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form
          form={form} // Add form reference here
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="Amount" name="amount">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="refrence">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
