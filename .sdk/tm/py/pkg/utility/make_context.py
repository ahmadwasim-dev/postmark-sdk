# PostmarkSdk SDK utility: make_context

from projectname_sdk.core.context import PostmarkSdkContext


def make_context_util(ctxmap, basectx):
    return PostmarkSdkContext(ctxmap, basectx)
