const UserCard = ({ user }) => {
  return user && (
    <div className="flex justify-center mu-10">
      <div className="card card-compact bg-base-300 w-96 shadow-xl">
          <figure>
              <img
              src={user.photoUrl}
              alt="Photo" />
          </figure>
          <div className="card-body">
              <h2 className="card-title">{ `${user.firstName} ${user.lastName}` }</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-center">
              <button className="btn btn-primary">Ignore</button>
              <button className="btn btn-secondary">Interested</button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default UserCard