export default async function Page({
    params,
  }: {
    params: Promise<{ courseId: string }>
  }) {
    const courseId = (await params).courseId

    return (
        <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate dolores nihil voluptates debitis nemo cumque dolore non dolorum fuga sapiente consequatur voluptatem culpa quo, accusantium totam doloribus dolor fugit quam!
            {courseId}
        </div>
    )
  }