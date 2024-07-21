"use client";
import { useEffect, useState } from "react";
import {
  getproductCategories,
  getUserCategories,
  updateUserCategory,
  createUserCategory,
} from "../action";
import { Loader } from "./loader";

const paginationNumbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
];
const pageSize = 6;

export const ProductCategory = () => {
  const [productCategoryList, setProductCategoryList] = useState<any[]>([]);
  const [userProductCategoryObj, setUserProductCategoryObj] = useState<{
    [key: string]: any;
  }>({
    userId: "",
    categoryId: "",
    active: "",
  });

  const [currentPage, setcurrentPage] = useState(1);
  const [paginationStartIndex, setPaginationStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getCategories();
    // userSelectedCategories();
    console.log(currentPage)
  }, [currentPage]);

  const getCategories = async () => {
    setIsLoading(true)
    let data = await getproductCategories({ page: currentPage, pageSize: pageSize });
    console.log(data);
    userSelectedCategories(data);
    setIsLoading(false)
  };

  const userSelectedCategories = async (categoryList: any[]) => {
    let userAuth = localStorage.getItem("userAuth");
    if (userAuth) {
      let parsedUserAuth: { userId?: string } | null = JSON.parse(userAuth);

      // if(typeof userAuth === Object && userAuth?.userId){

      // }
      if (typeof parsedUserAuth === "object" && parsedUserAuth?.userId) {
        let data = await getUserCategories({ userId: parsedUserAuth.userId });

        let dataObj: { [key: string]: any } = {};
        data.forEach((obj) => {
          console.log(obj.categoryId);
          dataObj[obj.categoryId] = obj;
        });
        console.log(dataObj);
        setUserProductCategoryObj(dataObj);

        let populatedCategoryList = categoryList.map((categoryObj) => {
          if (dataObj[categoryObj.categoryId]) {
            return { ...categoryObj, isSelected: true };
          } else {
            return { ...categoryObj, isSelected: false };
          }
        });
        console.log(populatedCategoryList);
        setProductCategoryList(populatedCategoryList);
      }
    }
  };

  const handleCheckChange = async (e: any, index: number) => {
    console.log(e.target.checked);
    let localProductCategoryList = productCategoryList;
    localProductCategoryList[index]["isSelected"] = e.target.checked;
    await updateUserCategories(localProductCategoryList[index]);
    setProductCategoryList([...localProductCategoryList]);
  };

  const updateUserCategories = async (productCategoryObj: {
    categoryId: string;
    isSelected: boolean;
  }) => {
    let userAuth = localStorage.getItem("userAuth");
    if (userAuth) {
      let parsedUserAuth: { userId?: string } | null = JSON.parse(userAuth);
      if (userProductCategoryObj[productCategoryObj.categoryId]) {
        await updateUserCategory({
          categoryId: productCategoryObj.categoryId,
          userId: parsedUserAuth?.userId ?? "",
          active: productCategoryObj.isSelected,
        });
      } else {
        await createUserCategory({
          categoryId: productCategoryObj.categoryId,
          userId: parsedUserAuth?.userId ?? "",
        });
      }
    }
  };

  const handlePagination = (page: number) => {
    setcurrentPage(page)
  }

  const handleRightArrow = () => {
    if(currentPage === 16){
        return
    }
    if(paginationStartIndex === 16){
        return
    }
    
        setPaginationStartIndex(prevState => prevState + 1)
    
    setcurrentPage( currentPage +1)
  }

  const handleLeftArrow = () => {
    if(currentPage === 1){
        return
    }
    if(paginationStartIndex === 0){
        return
    }
    setPaginationStartIndex(prevState => prevState - 1)
    setcurrentPage( currentPage - 1)
  }

  const handleLeftDoubleArrow = () => {
    if(paginationStartIndex === 0){
        return
    }
    
    setPaginationStartIndex(prevState => prevState - 6)
  }

  const handleRightDoubleArrow = () => {
    if(paginationStartIndex > 16-6){
        return
    }
    
    setPaginationStartIndex(prevState => prevState + 6)
  }

  return (
    <div className="flex justify-center overflow-hidden p-6">
      <div className="h-[70vh] min-w-[40vw] rounded-[20px] border-2 border-[#C1C1C1] px-[60px] py-10">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-[32px] font-semibold">
            Please mark your interests!
          </h1>
          <h4 className="text-base font-normal">We will keep you notified.</h4>
        </div>

        <div className="mt-8">
          <div>
            <h3 className="text-xl font-medium">My saved interests!</h3>
          </div>
          {isLoading ? <Loader/> :   <div className="mt-2 flex flex-col">
            {productCategoryList.length
              ? productCategoryList.map((productObj, index) => {
                  return (
                    <div
                      key={productObj.categoryId}
                      className="checkbox-container flex items-center py-3"
                    >
                      <input
                        type="checkbox"
                        checked={productObj.isSelected}
                        onChange={(e) => handleCheckChange(e, index)}
                        className="input-checkbox h-6 w-6 rounded-md bg-black focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-white"
                      />
                      <span className="ps-2">{productObj.name}</span>
                    </div>
                  );
                })
              : null}
          </div>}
        
        </div>
        <div className="flex">
        <span className="px-4 text-[#ACACAC]" onClick={handleLeftDoubleArrow}>&lt;&lt;</span>
          <span className="px-2 text-[#ACACAC]" onClick={handleLeftArrow}>&lt;</span>
          {paginationNumbers.slice(paginationStartIndex, paginationStartIndex+6).map((page) => (
            <span
              className={
                currentPage === page
                  ? "px-2 font-semibold"
                  : "px-2 text-[#ACACAC]"
              }
            //   onClick={(e:any,page: number) => handlePagination(page)}
            onClick={() => handlePagination(page)}
            >
              {page}
            </span>
          ))}
          <span className="px-2 text-[#ACACAC]" onClick={handleRightArrow}>&gt;</span>
          <span className="px-4 text-[#ACACAC]" onClick={handleRightDoubleArrow}>&gt;&gt;</span>
        </div>
      </div>
    </div>
  );
};
