'use client'
import { useEffect, useState } from "react";
import {
  getproductCategories,
  getUserCategories,
  updateUserCategory,
  createUserCategory,
} from "../action";

export const ProductCategory = () => {
  const [productCategoryList, setProductCategoryList] = useState<any[]>([]);
  const [userProductCategoryObj, setUserProductCategoryObj] = useState<{
    [key: string]: any;
  }>({
    userId: "",
    categoryId: "",
    active: "",
  });
  useEffect(() => {
    getCategories();
    // userSelectedCategories();
  }, []);

  const getCategories = async () => {
    let data = await getproductCategories();
    console.log(data);
    userSelectedCategories(data);
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

  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="flex min-h-[70vh] min-w-[40vw] flex-col items-center justify-center gap-12 rounded-[20px] border-2 border-[#C1C1C1] px-[60px] py-10">
        <div>
          <h1 className="text-[32px] font-semibold">
            Please mark your interests!
          </h1>
          <h4 className="text-base font-normal">We will keep you notified.</h4>
        </div>

        <div className="w-4/5">
          <div>
            <h3 className="text-xl font-medium">My saved interests!</h3>
          </div>
          <div className="flex flex-col">
            {productCategoryList.length
              ? productCategoryList.map((productObj, index) => {
                  return (
                    <div key={productObj.categoryId}>
                      <input
                        type="checkbox"
                        checked={productObj.isSelected}
                        onChange={(e) => handleCheckChange(e, index)}
                      />
                      <span>{productObj.name}</span>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};
