import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "@/api/api";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/account/orders")({
  component: OrdersPage,
});

function OrdersPage() {
  const {
    data: orders = [],
    isLoading,
  } = useQuery({
    queryKey: ["my-orders"],
    queryFn: getMyOrders,
  });

  if (isLoading) {
    return (
      <>
        <main className="min-h-screen pt-32 px-5">
          <p>Loading orders...</p>
        </main>
       
      </>
    );
  }

  return (
    <>
    

      <main className="min-h-screen pt-0 pb-20 px-5">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-4xl font-bold mb-8">
            My Orders
          </h1>

          {orders.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold">
                No Orders Found
              </h2>

              <p className="text-muted-foreground mt-2">
                You haven't placed any orders yet.
              </p>
            </div>
          ) : (
            <div className="space-y-6">

              {orders.map((order: any) => (
                <div
                  key={order._id}
                  className="rounded-2xl border p-6 shadow-sm"
                >
                  <div className="flex justify-between">

                    <div>

                      <h2 className="font-semibold text-lg">
                        Order #{order.orderNumber}
                      </h2>

                      <p className="text-sm text-muted-foreground">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                    <div className="text-right">

                      <p>
                        Status :
                        <strong> {order.status}</strong>
                      </p>

                      <p>
                        Payment :
                        <strong> {order.paymentStatus}</strong>
                      </p>

                      <p className="text-xl font-bold mt-2">
                        {SITE.currency}
                        {order.total}
                      </p>

                    </div>

                  </div>

                  <div className="mt-5 space-y-2">

                    {order.items.map((item: any) => (
                      <div
                        key={item._id}
                        className="flex justify-between"
                      >
                        <span>
                          {item.productName} × {item.quantity}
                        </span>

                        <span>
                          {SITE.currency}
                          {item.lineTotal}
                        </span>
                      </div>
                    ))}

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </main>
    </>
  );
}