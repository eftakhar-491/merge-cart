// import { authenticate } from "../shopify.server";

// import { useLoaderData, useNavigation, useSubmit } from "react-router";

// // export const loader = async ({ request }) => {
// //   const { admin } = await authenticate.admin(request);
// //   try {
// //     const response = await admin.graphql(
// //       `
// //       query {
// //         cartTransforms{
// //           edges{
// //             node{
// //               id
// //               functionId
// //               metafields(first:5){
// //                 edges{
// //                   node {
// //                     namespace
// //                     key
// //                     value
// //                     jsonValue
// //                   }
// //                 }
// //               }
// //             }
// //           }
// //         }
// //       }`,
// //     );

// //     const { data } = await response.json();

// //     console.log(data);
// //     return JSON.stringify({
// //       cartTransformId: null,
// //     });
// //   } catch (error) {
// //     console.log(
// //       "===============================error============================",
// //     );
// //     console.log(error);
// //     console.log(
// //       "===============================error============================",
// //     );
// //   }
// //   return null;
// // };

// export const loader = async ({ request }) => {
//   const { admin } = await authenticate.admin(request);

//   try {
//     const response = await admin.graphql(
//       `#graphql
//       query CartTransforms {
//         cartTransforms(first: 10) {
//           edges {
//             node {
//               id
//               functionId
//               metafields(first: 5) {
//                 edges {
//                   node {
//                     namespace
//                     key
//                     value
//                     jsonValue
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }`,
//     );

//     const body = await response.json();
//     console.log("cartTransforms data:", body.data);

//     // Example: pick the first cartTransformId if you need it
//     const firstTransformId =
//       body.data?.cartTransforms?.edges?.[0]?.node?.id ?? null;

//     return json({
//       cartTransformId: firstTransformId,
//       raw: body.data,
//     });
//   } catch (error) {
//     console.log("===== cartTransforms query error =====");
//     console.error(error);
//     console.log("===== cartTransforms query error =====");

//     // Optionally surface an error response
//     return json({ error: "Failed to load cartTransforms" }, { status: 500 });
//   }
// };

// // export const action = async ({ request }) => {
// //   const { admin } = await authenticate.admin(request);
// //   try {
// //     const response = await admin.graphql(
// //       `
// //       mutation CartTransformCreate($functionId:String!, $blockOnFailure:Boolean ){
// //         cartTransformCreate(functionId : $functionId, blockOnFailure:$blockOnFailure){
// //           userErrors{
// //             field
// //             message
// //           }
// //           cartTransform{
// //             id
// //           }
// //         }
// //       }
// //     `,
// //       {
// //         variables: {
// //           functionId: process.env.SHOPIFY_CART_TRANSFORM_ID,
// //           blockOnFailure: true,
// //         },
// //       },
// //     );

// //     const { data } = await response.json();

// //     console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
// //     console.log(data);
// //     console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
// //     if (data.cartTransformCreate.userErrors.length > 0) {
// //       console.log("User Errors:", data.cartTransformCreate.userErrors);
// //       return JSON.stringify({ success: false });
// //     }
// //     return JSON.stringify({ success: true });
// //   } catch (error) {
// //     console.log(error);
// //   }
// //   return null;
// // };

// export const action = async ({ request }) => {
//   const { admin } = await authenticate.admin(request);

//   try {
//     const response = await admin.graphql(
//       `#graphql
//       mutation CartTransformCreate(
//         $functionId: String!
//         $blockOnFailure: Boolean
//       ) {
//         cartTransformCreate(
//           functionId: $functionId
//           blockOnFailure: $blockOnFailure
//         ) {
//           userErrors {
//             field
//             message
//           }
//           cartTransform {
//             id
//           }
//         }
//       }
//     `,
//       {
//         variables: {
//           // Make sure this is set in your env!
//           functionId: process.env.SHOPIFY_CART_TRANSFORM_ID,
//           blockOnFailure: true,
//         },
//       },
//     );

//     const body = await response.json();

//     console.log("===== cartTransformCreate response =====");
//     console.dir(body, { depth: null });
//     console.log("========================================");

//     const errors = body.data?.cartTransformCreate?.userErrors ?? [];
//     if (errors.length > 0) {
//       console.log("User Errors:", errors);
//       return json({ success: false, errors });
//     }

//     const id = body.data?.cartTransformCreate?.cartTransform?.id ?? null;

//     return json({ success: true, id });
//   } catch (error) {
//     console.log("===== cartTransformCreate error =====");
//     console.error(error);
//     console.log("===== cartTransformCreate error =====");

//     return json(
//       { success: false, error: "Failed to create cart transform" },
//       { status: 500 },
//     );
//   }
// };

// export default function CreateBundle() {
//   const submit = useSubmit();
//   const navigation = useNavigation();
//   const isLoading = navigation.state === "submitting";
//   const handelActivation = () => {
//     console.log("Activate Cart Transform API");
//     submit({}, { method: "POST" });
//   };
//   const { cartTransformId } = JSON.parse(useLoaderData() || "{}");
//   return (
//     <s-section accessibilityLabel="Empty state section">
//       {!cartTransformId && (
//         <s-grid gap="base" justifyItems="center" paddingBlock="large-400">
//           <s-box maxInlineSize="200px" maxBlockSize="200px">
//             {/* aspectRatio should match the actual image dimensions (width/height) */}
//             <s-image
//               aspectRatio="1/0.5"
//               src="https://cdn.shopify.com/static/images/polaris/patterns/callout.png"
//               alt="A stylized graphic of four characters, each holding a puzzle piece"
//             />
//           </s-box>
//           <s-grid justifyItems="center" maxInlineSize="450px" gap="base">
//             <s-stack alignItems="center">
//               <s-heading>Create bundle</s-heading>
//               <s-paragraph>
//                 Create and manage your collection of puzzles for players to
//                 enjoy.
//               </s-paragraph>
//             </s-stack>
//             <s-button-group>
//               <s-button
//                 slot="secondary-actions"
//                 aria-label="Learn more about creating bundles"
//               >
//                 Learn more
//               </s-button>
//               <s-button
//                 action={{
//                   content: "Active Cart Transform API",
//                   onclick: handelActivation,
//                   desabled: isLoading,
//                   loading: isLoading,
//                 }}
//                 slot="primary-action"
//                 aria-label="Add a new bundle"
//               >
//                 Create bundle
//               </s-button>
//             </s-button-group>
//           </s-grid>
//         </s-grid>
//       )}
//       {cartTransformId && (
//         <s-banner status="success" title="Cart Transform API is activated">
//           You have successfully activated the Cart Transform API.
//         </s-banner>
//       )}
//     </s-section>
//   );
// }
import { useLoaderData, useNavigation, useSubmit } from "react-router";
import { authenticate } from "../shopify.server";

/* =========================
   LOADER – CHECK IF ACTIVE
========================= */
export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  try {
    const response = await admin.graphql(`
      query CartTransforms {
        cartTransforms(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    `);

    const body = await response.json();

    const cartTransformId =
      body.data?.cartTransforms?.edges?.[0]?.node?.id ?? null;

    return new Response(JSON.stringify({ cartTransformId }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Loader error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to load cart transforms" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};

/* =========================
   ACTION – ACTIVATE
========================= */
export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  try {
    const response = await admin.graphql(
      `
      mutation CartTransformCreate(
        $functionId: String!
        $blockOnFailure: Boolean!
      ) {
        cartTransformCreate(
          functionId: $functionId
          blockOnFailure: $blockOnFailure
        ) {
          cartTransform {
            id
          }
          userErrors {
            message
          }
        }
      }
      `,
      {
        variables: {
          functionId: process.env.SHOPIFY_CART_TRANSFORM_ID,
          blockOnFailure: true,
        },
      },
    );

    const body = await response.json();

    const errors = body.data.cartTransformCreate.userErrors;
    if (errors.length > 0) {
      return new Response(JSON.stringify({ success: false, errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        id: body.data.cartTransformCreate.cartTransform.id,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Action error:", error);
    return json(
      { success: false, error: "Failed to activate cart transform" },
      { status: 500 },
    );
  }
};

/* =========================
   COMPONENT – UI
========================= */
export default function CreateBundle() {
  const { cartTransformId } = useLoaderData();
  const submit = useSubmit();
  const navigation = useNavigation();

  const isLoading = navigation.state === "submitting";

  const handleActivation = () => {
    console.log("Activating Cart Transform API...");
    console.log("Activating Cart Transform API...");
    console.log("Activating Cart Transform API...");
    console.log("Activating Cart Transform API...");
    console.log("Activating Cart Transform API...");
    console.log("Activating Cart Transform API...");
    console.log("Activating Cart Transform API...");
    console.log("Activating Cart Transform API...");
    console.log("Activating Cart Transform API...");
    console.log("Activating Cart Transform API...");
    console.log("Activating Cart Transform API...");
    console.log("Activating Cart Transform API...");
    submit({}, { method: "post" });
  };

  return (
    <s-section>
      {!cartTransformId && (
        <s-grid justifyItems="center" gap="base">
          <s-heading>Create Bundle</s-heading>

          <s-paragraph>
            Activate Cart Transform API to enable bundle logic.
          </s-paragraph>

          <s-button
            onClick={handleActivation}
            loading={isLoading}
            disabled={isLoading}
          >
            Activate Cart Transform API
          </s-button>
        </s-grid>
      )}

      {cartTransformId && (
        <s-banner status="success" title="Activated">
          Cart Transform API is successfully activated.
        </s-banner>
      )}
    </s-section>
  );
}
