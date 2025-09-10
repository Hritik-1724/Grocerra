import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const {user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount, axios} = useAppContext();


    const logout = async ()=>{
      try {
        const { data } = await axios.get('/api/user/logout')
        if(data.success){
          toast.success(data.message)
          setUser(null);
          navigate('/')
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    useEffect(()=>{
      if(searchQuery.length > 0){
        navigate("/products")
      }
    },[searchQuery])

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

      <NavLink to='/' onClick={()=> setOpen(false)}>
        <span className="text-3xl md:text-4xl font-bold text-primary tracking-wide select-none" style={{ lineHeight: '2.5rem' }}>
          Grocerra
        </span>
      </NavLink>

      <div className="hidden sm:flex items-center gap-8">
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/products'>All Product</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input onChange={(e)=> setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
          <img src={assets.search_icon} alt='search' className='w-4 h-4'/>
        </div>

        {/* Cart Button Simple */}
        <button
          onClick={()=> navigate("/cart")}
          className="relative flex items-center gap-2 px-3 py-2 bg-primary text-white rounded hover:bg-primary-dull transition"
        >
          <img src={assets.nav_cart_icon} alt='cart' className='w-6 h-6' />
          <span className="font-semibold">Cart</span>
          <span className="absolute -top-2 -right-2 text-xs text-white bg-green-500 w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
            {getCartCount()}
          </span>
        </button>

        {/* Profile Button Simple */}
        {!user ? (
          <button
            onClick={()=> setShowUserLogin(true)}
            className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary-dull transition text-white rounded"
          >
            Login
          </button>
        ) : (
          <div className='relative group'>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded transition">
              <img src={assets.profile_icon} className='w-8 h-8 rounded-full border' alt="profile" />
              <span className="font-medium text-primary">{user.name?.split(' ')[0] || 'Profile'}</span>
            </button>
            <ul className='hidden group-hover:block absolute top-12 right-0 bg-white shadow border border-gray-200 py-2.5 w-36 rounded-md text-sm z-40'>
              <li onClick={()=> navigate("my-orders")} className='p-2 pl-4 hover:bg-primary/10 cursor-pointer'>My Orders</li>
              <li onClick={logout} className='p-2 pl-4 hover:bg-primary/10 cursor-pointer'>Logout</li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div className='flex items-center gap-6 sm:hidden'>
        <button
          onClick={()=> navigate("/cart")}
          className="relative flex items-center justify-center bg-primary text-white rounded-full w-11 h-11 hover:bg-primary-dull transition"
        >
          <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-90'/>
          <span className="absolute -top-1 -right-1 text-xs text-white bg-green-500 w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white">
            {getCartCount()}
          </span>
        </button>
        <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="">
          <img  src={assets.menu_icon} alt='menu'/>
        </button>
      </div>

      { open && (
        <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
          <NavLink to="/" onClick={()=> setOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={()=> setOpen(false)}>All Product</NavLink>
          {user && 
            <NavLink to="/products" onClick={()=> setOpen(false)}>My Orders</NavLink>
          }
          {!user ? (
            <button onClick={()=>{
              setOpen(false);
              setShowUserLogin(true);
            }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
              Login
            </button>
          ) : (
            <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
              Logout
            </button>
          )}
        </div>
      )}

    </nav>
  )
}

export default Navbar
